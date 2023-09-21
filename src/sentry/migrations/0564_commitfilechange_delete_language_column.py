# Generated by Django 3.2.20 on 2023-09-21 17:56

from django.db import migrations

from sentry.new_migrations.migrations import CheckedMigration


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
    is_dangerous = False

    dependencies = [
        ("sentry", "0563_commitfilechange_drop_language_column"),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            database_operations=[
                migrations.RunSQL(
                    """
                    ALTER TABLE "sentry_commitfilechange" DROP COLUMN "language";
                    """,
                    reverse_sql="""
                    ALTER TABLE "sentry_commitfilechange" ADD COLUMN "language" varchar(255) NULL;
                    """,
                    hints={"tables": ["sentry_commitfilechange"]},
                )
            ],
            state_operations=[],
        )
    ]
