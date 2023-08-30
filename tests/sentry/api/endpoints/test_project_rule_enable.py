from rest_framework import status

from sentry import audit_log
from sentry.constants import ObjectStatus
from sentry.models import AuditLogEntry, Rule
from sentry.silo import SiloMode
from sentry.testutils.cases import APITestCase
from sentry.testutils.outbox import outbox_runner
from sentry.testutils.silo import assume_test_silo_mode, region_silo_test


@region_silo_test(stable=True)
class ProjectRuleEnableTestCase(APITestCase):
    endpoint = "sentry-api-0-project-rule-enable"
    method = "PUT"

    def setUp(self):
        self.rule = self.create_project_rule(project=self.project)
        self.login_as(user=self.user)

    def test_simple(self):
        self.rule.status = ObjectStatus.DISABLED
        self.rule.save()
        with outbox_runner():
            self.get_success_response(
                self.organization.slug,
                self.project.slug,
                self.rule.id,
                status_code=status.HTTP_202_ACCEPTED,
            )
        assert Rule.objects.filter(id=self.rule.id, status=ObjectStatus.ACTIVE).exists()
        with assume_test_silo_mode(SiloMode.CONTROL):
            assert AuditLogEntry.objects.filter(
                organization_id=self.organization.id,
                target_object=self.rule.id,
                event=audit_log.get_event_id("RULE_EDIT"),
            ).exists()

    def test_rule_enabled(self):
        """Test that we do not accept an enabled rule"""
        response = self.get_error_response(
            self.organization.slug,
            self.project.slug,
            self.rule.id,
            status_code=status.HTTP_400_BAD_REQUEST,
        )
        assert response.data["detail"] == "Rule is not disabled."

    def test_duplicate_rule(self):
        """Test that we do not allow enabling a rule that is an exact duplicate of another rule in the same project"""
        conditions = [
            {
                "id": "sentry.rules.conditions.first_seen_event.FirstSeenEventCondition",
            }
        ]
        actions = [
            {
                "targetType": "IssueOwners",
                "fallthroughType": "ActiveMembers",
                "id": "sentry.mail.actions.NotifyEmailAction",
                "targetIdentifier": "",
            }
        ]
        rule = self.create_project_rule(
            project=self.project, action_match=actions, condition_match=conditions
        )

        rule2 = self.create_project_rule(
            project=self.project, action_match=actions, condition_match=conditions
        )
        rule2.status = ObjectStatus.DISABLED
        rule2.save()

        response = self.get_error_response(
            self.organization.slug,
            self.project.slug,
            rule2.id,
            status_code=status.HTTP_400_BAD_REQUEST,
        )
        assert (
            response.data["detail"]
            == f"This rule is an exact duplicate of '{rule.label}' in this project and may not be enabled unless it's edited."
        )

    def test_no_action_rule(self):
        """Test that we do not allow enabling a rule that has no action(s)"""
        conditions = [
            {
                "id": "sentry.rules.conditions.first_seen_event.FirstSeenEventCondition",
            }
        ]
        rule = Rule.objects.create(
            project=self.project,
            data={"conditions": conditions, "action_match": "all"},
        )
        rule.status = ObjectStatus.DISABLED
        rule.save()

        response = self.get_error_response(
            self.organization.slug,
            self.project.slug,
            rule.id,
            status_code=status.HTTP_400_BAD_REQUEST,
        )
        assert response.data["detail"] == "Cannot enable a rule with no action."
