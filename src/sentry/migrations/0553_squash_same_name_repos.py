# Generated by Django 3.2.20 on 2023-09-15 00:00

from django.db import migrations, router, transaction
from django.db.models import Count, Q

from sentry.new_migrations.migrations import CheckedMigration
from sentry.utils.query import RangeQuerySetWrapper


def squash_duped_repos(apps, schema_editor):
    Repository = apps.get_model("sentry", "Repository")
    PullRequest = apps.get_model("sentry", "PullRequest")
    ReleaseHeadCommit = apps.get_model("sentry", "ReleaseHeadCommit")
    LatestRepoReleaseEnvironment = apps.get_model("sentry", "LatestRepoReleaseEnvironment")
    Commit = apps.get_model("sentry", "Commit")

    duplicates = (
        Repository.objects.values("organization_id", "name")
        .annotate(count=Count("*"))
        .filter(count__gt=1)
    )

    for duplicate_group in RangeQuerySetWrapper(duplicates):
        org_id = duplicate_group["organization_id"]
        duplicate_name = duplicate_group["name"]
        duped_repos = Repository.objects.filter(organization_id=org_id, name=duplicate_name)

        # try to find a repo with external_id and provider
        populated_repo = (
            duped_repos.exclude(Q(external_id=None) | Q(provider=None))
            .order_by("-date_added")
            .first()
        )

        if populated_repo:
            repo_id = populated_repo.id

        else:
            # pick the most recent one and squash the others
            selected_repo = duped_repos.order_by("-date_added").first()
            repo_id = selected_repo.id

        # squash all of the other existing repos into this repo
        other_repo_ids = set(duped_repos.exclude(id=repo_id).values_list("id", flat=True))

        with transaction.atomic(router.db_for_write(Commit)):
            # reset all references to the other repos
            # these other models have references to repository_id
            PullRequest.objects.filter(repository_id__in=other_repo_ids).update(
                repository_id=repo_id
            )
            ReleaseHeadCommit.objects.filter(repository__id__in=other_repo_ids).update(
                repository_id=repo_id
            )
            LatestRepoReleaseEnvironment.objects.filter(repository__id__in=other_repo_ids).update(
                repository_id=repo_id
            )
            Commit.objects.filter(repository__id__in=other_repo_ids).update(repository_id=repo_id)

            # delete duped repos
            Repository.objects.filter(id__in=other_repo_ids).delete()


class Migration(CheckedMigration):
    # This flag is used to mark that a migration shouldn't be automatically run in production. For
    # the most part, this should only be used for operations where it's safe to run the migration
    # after your code has deployed. So this should not be used for most operations that alter the
    # schema of a table.
    # Here are some things that make sense to mark as dangerous:
    # - Large data migrations. Typically we want these to be run manually by ops so that they can
    #   be monitored and not block the deploy for a long period of time while they run.
    # - Adding indexes to large tables. Since this can take a long time, we'd generally prefer to
    #   have ops run this and not block the deploy. Note that while adding an index is a schema
    #   change, it's completely safe to run the operation after the code has deployed.
    is_dangerous = True

    dependencies = [
        ("sentry", "0552_create_neglectedalert_table"),
    ]

    operations = [
        migrations.RunPython(
            squash_duped_repos,
            reverse_code=migrations.RunPython.noop,
            hints={
                "tables": [
                    "sentry_repository",
                    "sentry_pull_request",
                    "sentry_releaseheadcommit",
                    "sentry_latestrelease",
                    "sentry_commit",
                ]
            },
        ),
    ]
