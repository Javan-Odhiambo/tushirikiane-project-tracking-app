from datetime import datetime, timezone
from django.http import HttpRequest
from django.shortcuts import get_object_or_404
from rest_framework import status
from django.db import transaction

from django.contrib.auth import get_user_model

from project_tracker import models, serializers

User = get_user_model()


def generate_email_list(email_string):
    """
    Generate a list of emails from a string of emails separated by commas.

    Args:
    - email_string (str): A string containing emails separated by commas.

    Returns:
    - list: A list of emails.
    """
    if not email_string:
        return []

    email_list = [email.strip() for email in email_string.split(",")]
    return email_list


def check_if_member(project, user):
    """Check if a user is a member of a project."""
    return models.Member.objects.filter(project=project, user=user).exists()


def add_members(project, new_members, request):
    """Add members to a project."""
    for email in generate_email_list(new_members):
        try:
            user = User.objects.get(email=email)
            if not check_if_member(project, user):
                models.Member.objects.create(
                    user=user, project=project, is_admin=False, is_owner=False
                )
        except User.DoesNotExist:
            return {"detail": f"User {email} does not exist."}
    members = models.Member.objects.filter(project=project)
    serializer = serializers.MemberSerializer(
        members, many=True, context={"request": request}
    )
    return serializer.data


def update_member(project, member_data, request):
    """Update member of a project."""
    try:
        email = member_data["user"]["email"]
        user = User.objects.get(email=email)
        member = models.Member.objects.get(user=user, project=project)
        member.is_admin = member_data["is_admin"]
        member.save()
    except User.DoesNotExist:
        return {"detail": f"User {user} does not exist."}
    return {"detail": "Member updated successfully."}


def delete_member(project, member_data, request):
    """Delete member of a project"""
    try:
        email = member_data["user"]["email"]
        user = User.objects.get(email=email)
        # remove member logic
    except User.DoesNotExist:
        return {"detail": f"User {user} does not exist."}
    return {"detail": "Member deleted successfully."}


def get_members(project, request):
    """Get members of a project."""
    members = models.Member.objects.filter(project=project)
    serializer = serializers.MemberSerializer(
        members, many=True, context={"request": request}
    )
    return serializer.data


def get_tasks(project, request):
    """Get tasks of a project."""
    tasks = models.Task.objects.filter(project=project)
    serializer = serializers.TaskSerializer(
        tasks, many=True, context={"request": request}
    )
    return serializer.data


def get_requests(task, request):
    """Get tasks requests."""
    requests = models.Request.objects.filter(task=task)
    serializer = serializers.TaskRequestSerializer(
        requests, many=True, context={"request": request}
    )
    return serializer.data, status.HTTP_200_OK


def get_request(request_id, request):
    """Get tasks requests."""
    try:
        request = models.Request.objects.get(pk=request_id)
        serializer = serializers.TaskRequestSerializer(
            request, context={"request": request}
        )
        return serializer.data, status.HTTP_200_OK
    except models.Request.DoesNotExist:
        return {"detail": "Request does not exist."}, status.HTTP_404_NOT_FOUND


def add_task_requests(task, request):
    """Add task requests."""
    new_request, created = models.Request.objects.get_or_create(
        task=task, member=request.user, status="pending"
    )
    if created:
        return (
            serializers.TaskRequestSerializer(
                new_request, context={"request": request}
            ).data,
            status.HTTP_201_CREATED,
        )
    else:
        return {"detail": "Request already sent"}, status.HTTP_200_OK


def delete_task_requests(request_id):
    """Delete task requests."""
    request = models.Request.objects.get(pk=request_id)
    request.delete()
    return {"detail": "Request has been deleted."}


def archive_project(project):
    """Archive a project."""
    project.is_active = False
    project.save()
    return {"detail": "Project has been archived."}


def unarchive_project(project, request):
    """Unarchive a project."""
    project.is_active = True
    project.save()
    return {"detail": "Project has been unarchived."}


def approve_request(request_id, request):
    """Approve task request"""
    print(request.user.id)
    with transaction.atomic():
        member = get_object_or_404(models.Member, pk=request.data["member_id"])
        request = get_object_or_404(models.Request, pk=request_id)
        task = get_object_or_404(models.Task, pk=request.task.id)
        task.assignor = User.objects.get(id=request.user.id)
        task.assignee = member.user
        task.status = "in_progress"
        request.status = "approved"
        task.save()
        request.save()
        return {"detail": "Request has been approved."}, status.HTTP_200_OK
    return {"detail": "Request could not be approved."}, status.HTTP_400_BAD_REQUEST


def leave_project(project, user):
    """Leave a project."""
    project.members.remove(user)
    return {"detail": "Member has left the project."}


def get_project_tasks(project, request):
    """Get tasks of a project."""
    tasks = models.Task.objects.filter(project=project)
    serializer = serializers.TaskSerializer(
        tasks, many=True, context={"request": request}
    )
    return serializer.data


def add_project_task(project, request):
    """Add a task to a project."""
    member_id = request.data.get("assignee", None)
    if member_id:
        try:
            member = models.Member.objects.get(pk=member_id, project=project)
            assignee = member.user
        except Exception as e:
            return {"detail": "Assignee not found."}, status.HTTP_400_BAD_REQUEST
    else:
        assignee = None

    task = models.Task.objects.create(
        title=request.data["title"],
        description=request.data.get("description", ""),
        project=project,
        created_by=request.user,
        assignee=assignee,
        assignor=request.user if assignee else None,
        status=request.data.get("status", "pending"),
        start_at=request.data.get("start_at", None),
        due_at=request.data.get("due_at", None),
    )
    return (
        serializers.TaskSerializer(task, context={"request": request}).data,
        status.HTTP_201_CREATED,
    )


def get_my_tasks(user, request):
    """Get tasks assigned to a user."""
    tasks = models.Task.objects.filter(assignee=user)
    serializer = serializers.TaskSerializer(
        tasks, many=True, context={"request": request}
    )
    return serializer.data
