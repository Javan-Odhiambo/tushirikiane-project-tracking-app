from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from project_tracker import models, serializers
from project_tracker.services import (
    add_members,
    archive_project,
    get_members,
    get_project_tasks,
    get_requests,
    leave_project,
    update_member,
    get_my_tasks,
)


class ProjectViewSet(viewsets.ModelViewSet):
    """Viewset for the Project model."""

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return projects that the user is a member of."""
        user = self.request.user
        return models.Project.objects.filter(members=user)
    
    def get_serializer_class(self):
        """Return the serializer class based on the action."""
        if self.action == 'list':
            return serializers.ProjectListSerializer
        elif self.action == 'retrieve':
            return serializers.ProjectDetailSerializer
        return serializers.ProjectDetailSerializer

    @action(detail=True, methods=["GET", "POST", "PUT"])
    def members(self, request, pk=None):
        """Add/Get/Update members to a project."""
        project = self.get_object()
        if request.method == "POST":
            response = add_members(project, request.data["members"], request)
            return Response(response, status=status.HTTP_201_CREATED)
        elif request.method == "PUT":
            print(request.data)
            response = update_member(project, request.data, request)
            return Response(response, status=status.HTTP_200_OK)
        else:
            members = get_members(project, request)
            return Response(members, status=status.HTTP_200_OK)

    @action(detail=True, methods=["GET"])
    def task_requests(self, request, pk=None):
        project = self.get_object()
        requests = get_requests(project, request)
        return Response(requests, status=status.HTTP_200_OK)

    @action(detail=True, methods=["POST"])
    def leave_project(self, request, pk=None):
        response = leave_project(self.get_object(), request.user)
        return Response(response, status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=["POST"])
    def archive_project(self, request, pk=None):
        response = archive_project(self.get_object())
        return Response(response, status=status.HTTP_200_OK)

    @action(detail=True, methods=["GET", "POST"])
    def tasks(self, request, pk=None):
        project = self.get_object()
        if request.method == "GET":
            tasks = get_project_tasks(project, request)
            return Response(tasks, status=status.HTTP_200_OK)
        elif request.method == "POST":
            # Add your logic for the POST method here
            return Response(status=status.HTTP_200_OK)


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return tasks of projects that the user is a member of."""
        user = self.request.user
        return models.Task.objects.filter(project__members=user)

    @action(detail=False, methods=["GET"])
    def mine(self, request):
        """Return tasks that the user is assigned to."""
        my_tasks = get_my_tasks(request.user, request)
        return Response(my_tasks, status=status.HTTP_200_OK)
