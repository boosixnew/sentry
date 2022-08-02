from sentry.api.base import customer_silo_endpoint
from sentry.api.bases.avatar import AvatarMixin
from sentry.api.bases.team import TeamEndpoint
from sentry.models import TeamAvatar


@customer_silo_endpoint
class TeamAvatarEndpoint(AvatarMixin, TeamEndpoint):
    object_type = "team"
    model = TeamAvatar
