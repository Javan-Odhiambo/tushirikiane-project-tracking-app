from django.contrib import admin
from project_tracker.models import Member, Project, Request, Task

# Register your models here.

admin.site.register(Member)


class MemberAdmin(admin.ModelAdmin):
    list_display = ("user", "project", "is_admin", "is_owner")
    list_filter = ("user", "project", "is_admin", "is_owner")
    search_fields = ("user", "project", "is_admin", "is_owner")


admin.site.register(Project)


class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "description",
        "members",
        "is_active",
        "created_at",
        "updated_at",
    )
    list_filter = (
        "title",
        "description",
        "members",
        "is_active",
        "created_at",
        "updated_at",
    )
    search_fields = (
        "title",
        "description",
        "members",
        "is_active",
        "created_at",
        "updated_at",
    )


admin.site.register(Request)


class RequestAdmin(admin.ModelAdmin):
    list_display = ("member", "task", "status", "created_at", "updated_at")
    list_filter = ("member", "task", "status", "created_at", "updated_at")
    search_fields = ("member", "task", "status", "created_at", "updated_at")


admin.site.register(Task)


class TaskAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "description",
        "project",
        "assignee",
        "assignor",
        "status",
        "start_at",
        "due_at",
        "completed_at",
        "created_at",
        "updated_at",
    )
    list_filter = (
        "title",
        "description",
        "project",
        "assignee",
        "assignor",
        "status",
        "start_at",
        "due_at",
        "completed_at",
        "created_at",
        "updated_at",
    )
    search_fields = (
        "title",
        "description",
        "project",
        "assignee",
        "assignor",
        "status",
        "start_at",
        "due_at",
        "completed_at",
        "created_at",
        "updated_at",
    )
