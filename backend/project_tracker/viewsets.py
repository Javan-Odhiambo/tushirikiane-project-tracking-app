from accounts.authentication import CustomJWTAuthentication
from project_tracker import models, serializers
from project_tracker.services import (
    add_members,
    add_project_task,
    add_task_requests,
    approve_request,
    archive_project,
    delete_task_requests,
    get_members,
    get_my_tasks,
    get_project_tasks,
    get_request,
    get_requests,
    leave_project,
    remove_member,
    unarchive_project,
    update_member,
)
from rest_framework import status, views, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class ProjectViewSet(viewsets.ModelViewSet):
    """Viewset for the Project model."""

    permission_classes = [IsAuthenticated]
    authentication_classes = [CustomJWTAuthentication]

    def get_queryset(self):
        """Return projects that the user is a member of."""
        user = self.request.user
        return models.Project.objects.filter(members=user)

    def get_serializer_class(self):
        """Return the serializer class based on the action."""
        return serializers.ProjectSerializer

    @action(detail=True, methods=["GET", "POST", "PUT"])
    def members(self, request, pk=None):
        """Add/Get/Update members to a project."""
        project = self.get_object()
        if request.method == "POST":
            response, status = add_members(project, request.data["members"], request)
            return Response(response, status=status)
        elif request.method == "PUT":
            print(request.data)
            response, status = update_member(project, request.data, request)
            return Response(response, status=status)
        else:
            members, status = get_members(project, request)
            return Response(members, status=status)

    @action(detail=True, methods=["POST"])
    def make_admin(self, request, pk=None, member_id=None):
        """Make member an admin"""
        ...

    @action(detail=True, methods=["POST"])
    def remove_admin(self, request, pk=None, member_id=None): ...

    @action(detail=True, methods=["POST"])
    def leave_project(self, request, pk=None):
        """Leave project"""
        response, status = leave_project(self.get_object(), request.user)
        return Response(response, status=status)

    @action(detail=True, methods=["POST"])
    def archive_project(self, request, pk=None):
        response, status = archive_project(self.get_object())
        return Response(response, status=status)

    @action(detail=True, methods=["POST"])
    def unarchive_project(self, request, pk=None):
        """Unarchive project"""
        response, status = unarchive_project(self.get_object(), False)
        return Response(response, status=status)

    @action(detail=True, methods=["GET", "POST"])
    def tasks(self, request, pk=None):
        project = self.get_object()
        if request.method == "GET":
            tasks, status = get_project_tasks(project, request)
            return Response(tasks, status=status)
        elif request.method == "POST":
            response, status = add_project_task(project, request)
            return Response(response, status=status)

    @action(detail=True, methods=["DELETE"])
    def remove_member(self, request, pk=None, member_id=None):
        project = self.get_object()
        response, status = remove_member(project, request)
        return Response(response, status=status)
    
    @action(detail=True, methods=["GET"])
    def tasks_requests(self, request, pk=None):
        """Get tasks requests"""
        project = self.get_object()
        tasks = models.Task.objects.filter(project=project)
        requests = models.Request.objects.filter(task__in=tasks)
        serializer = serializers.RequestSerializer(
            requests, many=True, context={"request": request}
        )
        return Response(serializer.data, status=status.HTTP_200_OK)


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.TaskSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [CustomJWTAuthentication]

    def get_queryset(self):
        """Return tasks of projects that the user is a member of."""
        user = self.request.user
        return models.Task.objects.filter(project__members=user)

    @action(detail=False, methods=["GET"])
    def mine(self, request):
        """Return tasks that the user is assigned to."""
        my_tasks = get_my_tasks(request.user, request)
        return Response(my_tasks, status=status)

    @action(
        detail=True,
        methods=[
            "GET",
            "POST",
        ],
    )
    def requests(self, request, pk=None, request_id=None):
        """
        GET: Get requests for the project
        POST: Add request for a task
            request body = task_id
        DELETE: Delete request for a task
            request body = request_id
        """
        status = None
        task = self.get_object()
        if request.method == "GET":
            if request_id:
                requests, status = get_request(request_id, request)
            else:
                requests, status = get_requests(task, request)
            return Response(requests, status=status)
        elif request.method == "POST":
            requests, status = add_task_requests(task, request)
            return Response(requests, status=status)
        else:
            response, status = delete_task_requests(request_id)
            return Response(response, status=status.HTTP_200_OK)

    @action(detail=True, methods=["POST"])
    def approve_request(self, request, pk=None, request_id=None):
        """Approve request"""
        response, status = approve_request(request_id, request)
        return Response(response, status=status)

    @action(detail=True, methods=["POST"])
    def reject_request(self, request, pk=None, request_id=None):
        """Reject request"""
        response, status = reject_request(request_id, request)
        return Response(response, status=status)
