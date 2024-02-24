from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _

User = get_user_model()


# Create your models here.
class Member(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(
        "Project", on_delete=models.CASCADE, related_name="contributors"
    )
    is_admin = models.BooleanField(_("is admin"), default=False)
    is_owner = models.BooleanField(_("is owner"), default=False)

    class Meta:
        verbose_name = _("member")
        verbose_name_plural = _("members")

    def __str__(self) -> str:
        return f"{self.user.email} is a member of {self.project.title}"


class Project(models.Model):
    title = models.CharField(_("title"), max_length=50)
    description = models.TextField(_("description"), blank=True, null=True)
    members = models.ManyToManyField(
        User,
        through=Member,
        related_name="projects",
        verbose_name=_("members"),
        blank=True,
    )
    is_active = models.BooleanField(_("is active"), default=True)
    created_at = models.DateTimeField(_("created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("updated at"), auto_now=True)

    class Meta:
        verbose_name = _("project")
        verbose_name_plural = _("projects")

    def __str__(self) -> str:
        return self.title


class Task(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("in_progress", "In Progress"),
        ("completed", "Completed"),
        ("assigned", "Assigned"),
    ]
    title = models.CharField(_("title"), max_length=50)
    description = models.TextField(_("description"), blank=True, null=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="tasks")
    assignee = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="tasks_assigned_to",
        blank=True,
        null=True,
    )
    assignor = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="tasks_assigned_by",
        null=True,
        blank=True,
    )
    status = models.CharField(_("status"), max_length=50, choices=STATUS_CHOICES)
    start_at = models.DateTimeField(_("start at"))
    due_at = models.DateTimeField(_("due at"))
    completed_at = models.DateTimeField(_("completed at"), null=True, blank=True)
    created_at = models.DateTimeField(_("created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("updated at"), auto_now=True)

    class Meta:
        verbose_name = _("task")
        verbose_name_plural = _("tasks")

    def __str__(self) -> str:
        return self.title


class Request(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("accepted", "Accepted"),
        ("declined", "Declined"),
    ]
    member = models.ForeignKey(
        User, related_name="requests", verbose_name="member", on_delete=models.CASCADE
    )
    task = models.ForeignKey(
        Task, related_name="requests", verbose_name="task", on_delete=models.CASCADE
    )
    status = models.CharField(_("status"), max_length=50, choices=STATUS_CHOICES)
    created_at = models.DateTimeField(_("created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("updated at"), auto_now=True)

    class Meta:
        verbose_name = _("request")
        verbose_name_plural = _("requests")

    def __str__(self) -> str:
        return f"Request for {self.task.title} by {self.member.email}"
