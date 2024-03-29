# Generated by Django 5.0 on 2024-02-26 09:03

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("project_tracker", "0004_alter_task_due_at"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name="task",
            name="created_by",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="tasks_created_by",
                to=settings.AUTH_USER_MODEL,
            ),
            preserve_default=False,
        ),
    ]
