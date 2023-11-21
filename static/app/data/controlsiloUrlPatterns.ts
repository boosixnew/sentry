// This is generated code.
// To update it run `getsentry django generate_controlsilo_urls --format=js --output=/path/to/thisfile.ts`
const patterns: RegExp[] = [
  new RegExp('^remote/heroku/resources(?:/[^/]+)?$'),
  new RegExp('^remote/github/marketplace/purchase/$'),
  new RegExp('^docs/api/user/$'),
  new RegExp('^_experiment/log_exposure/$'),
  new RegExp('^api/0/signup/$'),
  new RegExp('^api/0/audit-logs/$'),
  new RegExp('^api/0/_admin/options/$'),
  new RegExp('^api/0/billingadmins/$'),
  new RegExp('^api/0/beacons/$'),
  new RegExp('^api/0/beacons/[^/]+/$'),
  new RegExp('^api/0/beacons/[^/]+/checkins/$'),
  new RegExp('^api/0/beacons/[^/]+/customers/$'),
  new RegExp('^api/0/beacons/[^/]+/related-beacons/$'),
  new RegExp('^api/0/broadcasts/$'),
  new RegExp('^api/0/broadcasts/[^/]+/$'),
  new RegExp('^api/0/customers/[^/]+/subscription/usage-logs/$'),
  new RegExp('^api/0/customers/[^/]+/policies/$'),
  new RegExp('^api/0/customers/[^/]+/migrate-google-domain/$'),
  new RegExp('^api/0/users/[^/]+/merge-accounts/$'),
  new RegExp('^api/0/policies/$'),
  new RegExp('^api/0/policies/[^/]+/$'),
  new RegExp('^api/0/policies/[^/]+/revisions/$'),
  new RegExp('^api/0/policies/[^/]+/revisions/[^/]+/$'),
  new RegExp('^api/0/promocodes/$'),
  new RegExp('^api/0/promocodes/[^/]+/$'),
  new RegExp('^api/0/promocodes/[^/]+/claimants/$'),
  new RegExp('^api/0/gdpr_request/$'),
  new RegExp('^api/0/sponsored_account_request/$'),
  new RegExp('^api/0/migrate_to_hosted/$'),
  new RegExp('^api/0/sponsored_education_account/$'),
  new RegExp('^api/0/organizations/[^/]+/broadcasts/$'),
  new RegExp('^api/0/auth-details/$'),
  new RegExp('^api/0/_admin/instance-level-oauth/$'),
  new RegExp('^api/0/_admin/instance-level-oauth/[^/]+/$'),
  new RegExp('^_admin/'),
  new RegExp('^api/0/organizations/[^/]+/api-keys/$'),
  new RegExp('^api/0/organizations/[^/]+/api-keys/[^/]+/$'),
  new RegExp('^api/0/organizations/[^/]+/audit-logs/$'),
  new RegExp('^api/0/organizations/[^/]+/integrations/$'),
  new RegExp('^api/0/organizations/[^/]+/integrations/[^/]+/$'),
  new RegExp('^api/0/organizations/[^/]+/sentry-app-installations/$'),
  new RegExp('^api/0/organizations/[^/]+/sentry-apps/$'),
  new RegExp('^api/0/organizations/[^/]+/sentry-app-components/$'),
  new RegExp('^api/0/organizations/[^/]+/org-auth-tokens/$'),
  new RegExp('^api/0/organizations/[^/]+/org-auth-tokens/[^/]+/$'),
  new RegExp('^api/0/organizations/[^/]+/broadcasts/$'),
  new RegExp('^api/0/users/$'),
  new RegExp('^api/0/users/[^/]+/$'),
  new RegExp('^api/0/users/[^/]+/regions/$'),
  new RegExp('^api/0/users/[^/]+/avatar/$'),
  new RegExp('^api/0/users/[^/]+/authenticators/$'),
  new RegExp('^api/0/users/[^/]+/authenticators/[^/]+/enroll/$'),
  new RegExp('^api/0/users/[^/]+/authenticators/[^/]+/[^/]+/$'),
  new RegExp('^api/0/users/[^/]+/authenticators/[^/]+/$'),
  new RegExp('^api/0/users/[^/]+/emails/$'),
  new RegExp('^api/0/users/[^/]+/emails/confirm/$'),
  new RegExp('^api/0/users/[^/]+/identities/[^/]+/$'),
  new RegExp('^api/0/users/[^/]+/identities/$'),
  new RegExp('^api/0/users/[^/]+/ips/$'),
  new RegExp('^api/0/users/[^/]+/notification-settings/$'),
  new RegExp('^api/0/users/[^/]+/notifications/$'),
  new RegExp('^api/0/users/[^/]+/notifications/[^/]+/$'),
  new RegExp('^api/0/users/[^/]+/notification-options/$'),
  new RegExp('^api/0/users/[^/]+/notification-options/[^/]+/$'),
  new RegExp('^api/0/users/[^/]+/notification-providers/$'),
  new RegExp('^api/0/users/[^/]+/password/$'),
  new RegExp('^api/0/users/[^/]+/permissions/$'),
  new RegExp('^api/0/users/[^/]+/permissions/config/$'),
  new RegExp('^api/0/users/[^/]+/permissions/[^/]+/$'),
  new RegExp('^api/0/users/[^/]+/roles/$'),
  new RegExp('^api/0/users/[^/]+/roles/[^/]+/$'),
  new RegExp('^api/0/users/[^/]+/social-identities/$'),
  new RegExp('^api/0/users/[^/]+/social-identities/[^/]+/$'),
  new RegExp('^api/0/users/[^/]+/subscriptions/$'),
  new RegExp('^api/0/users/[^/]+/organization-integrations/$'),
  new RegExp('^api/0/users/[^/]+/user-identities/$'),
  new RegExp('^api/0/users/[^/]+/user-identities/[^/]+/[^/]+/$'),
  new RegExp('^api/0/userroles/$'),
  new RegExp('^api/0/userroles/[^/]+/$'),
  new RegExp('^api/0/sentry-apps/$'),
  new RegExp('^api/0/sentry-apps/[^/]+/$'),
  new RegExp('^api/0/sentry-apps/[^/]+/features/$'),
  new RegExp('^api/0/sentry-apps/[^/]+/components/$'),
  new RegExp('^api/0/sentry-apps/[^/]+/avatar/$'),
  new RegExp('^api/0/sentry-apps/[^/]+/api-tokens/$'),
  new RegExp('^api/0/sentry-apps/[^/]+/api-tokens/[^/]+/$'),
  new RegExp('^api/0/sentry-apps/[^/]+/stats/$'),
  new RegExp('^api/0/sentry-apps/[^/]+/publish-request/$'),
  new RegExp('^api/0/sentry-app-installations/[^/]+/$'),
  new RegExp('^api/0/sentry-app-installations/[^/]+/authorizations/$'),
  new RegExp('^api/0/auth/$'),
  new RegExp('^api/0/auth/config/$'),
  new RegExp('^api/0/auth/login/$'),
  new RegExp('^api/0/broadcasts/$'),
  new RegExp('^api/0/broadcasts/[^/]+/$'),
  new RegExp('^api/0/assistant/$'),
  new RegExp('^api/0/api-applications/$'),
  new RegExp('^api/0/api-applications/[^/]+/$'),
  new RegExp('^api/0/api-applications/[^/]+/rotate-secret/$'),
  new RegExp('^api/0/api-authorizations/$'),
  new RegExp('^api/0/api-tokens/$'),
  new RegExp('^api/0/authenticators/$'),
  new RegExp('^api/0/accept-invite/[^/]+/[^/]+/[^/]+/$'),
  new RegExp('^api/0/accept-invite/[^/]+/[^/]+/$'),
  new RegExp('^api/0/notification-defaults/$'),
  new RegExp('^api/0/sentry-apps-stats/$'),
  new RegExp('^api/0/doc-integrations/$'),
  new RegExp('^api/0/doc-integrations/[^/]+/$'),
  new RegExp('^api/0/doc-integrations/[^/]+/avatar/$'),
  new RegExp('^api/0/integration-features/$'),
  new RegExp('^api/0/wizard/$'),
  new RegExp('^api/0/wizard/[^/]+/$'),
  new RegExp('^api/0/internal/health/$'),
  new RegExp('^api/0/internal/options/$'),
  new RegExp('^api/0/internal/beacon/$'),
  new RegExp('^api/0/internal/quotas/$'),
  new RegExp('^api/0/internal/queue/tasks/$'),
  new RegExp('^api/0/internal/warnings/$'),
  new RegExp('^api/0/internal/packages/$'),
  new RegExp('^api/0/internal/environment/$'),
  new RegExp('^api/0/internal/mail/$'),
  new RegExp('^api/0/internal/integration-proxy/\\S*$'),
  new RegExp('^api/0/internal/rpc/[^/]+/[^/]+/$'),
  new RegExp('^api/0/internal/feature-flags/$'),
  new RegExp('^oauth/authorize/$'),
  new RegExp('^oauth/userinfo/$'),
  new RegExp('^saml/acs/[^/]+/$'),
  new RegExp('^auth/login/$'),
  new RegExp('^auth/login/[^/]+/$'),
  new RegExp('^auth/channel/[^/]+/[^/]+/$'),
  new RegExp('^auth/link/[^/]+/$'),
  new RegExp('^auth/2fa/$'),
  new RegExp('^auth/sso/$'),
  new RegExp('^auth/register/$'),
  new RegExp('^account/settings/wizard/[^/]+/$'),
  new RegExp('^avatar/[^/]+/$'),
  new RegExp('^sentry-app-avatar/[^/]+/$'),
  new RegExp('^extensions/jira/ui-hook/$'),
  new RegExp('^extensions/jira/descriptor/$'),
  new RegExp('^extensions/jira/installed/$'),
  new RegExp('^extensions/jira/uninstalled/$'),
  new RegExp('^extensions/jira/search/[^/]+/[^/]+/$'),
  new RegExp('^extensions/jira/configure/$'),
  new RegExp('^extensions/jira-server/issue-updated/[^/]+/$'),
  new RegExp('^extensions/jira-server/search/[^/]+/[^/]+/$'),
  new RegExp('^extensions/slack/link-identity/[^/]+/$'),
  new RegExp('^extensions/slack/unlink-identity/[^/]+/$'),
  new RegExp('^extensions/github/webhook/$'),
  new RegExp('^extensions/github/installation/[^/]+/$'),
  new RegExp('^extensions/github/search/[^/]+/[^/]+/$'),
  new RegExp('^extensions/gitlab/search/[^/]+/[^/]+/$'),
  new RegExp('^extensions/vsts/search/[^/]+/[^/]+/$'),
  new RegExp('^extensions/vsts/configure/$'),
  new RegExp('^extensions/bitbucket/descriptor/$'),
  new RegExp('^extensions/bitbucket/installed/$'),
  new RegExp('^extensions/bitbucket/uninstalled/$'),
  new RegExp('^extensions/bitbucket/search/[^/]+/[^/]+/$'),
  new RegExp('^extensions/vercel/delete/$'),
  new RegExp('^extensions/vercel/webhook/$'),
  new RegExp('^extensions/msteams/configure/$'),
  new RegExp('^extensions/msteams/link-identity/[^/]+/$'),
  new RegExp('^extensions/msteams/unlink-identity/[^/]+/$'),
  new RegExp('^extensions/discord/link-identity/[^/]+/$'),
  new RegExp('^extensions/discord/unlink-identity/[^/]+/$'),
  new RegExp('^share/(?:group|issue)/[^/]+/$'),
];

export default patterns;
