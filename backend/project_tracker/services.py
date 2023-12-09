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


def get_requests(project, request):
    """Get tasks requests."""
    tasks = models.Task.objects.filter(project=project)
    serialized_requests = []
    for task in tasks:
        request_data = serializers.RequestSerializer(
            models.Request.objects.filter(task=task),
            many=True,
            context={"request": request},
        ).data
        serialized_requests.extend(request_data)
    return serialized_requests


def archive_project(project):
    """Archive a project."""
    project.is_active = False
    project.save()
    return {"detail": "Project has been archived."}


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


def get_my_tasks(user, request):
    """Get tasks assigned to a user."""
    tasks = models.Task.objects.filter(assignee=user)
    serializer = serializers.TaskSerializer(
        tasks, many=True, context={"request": request}
    )
    return serializer.data
