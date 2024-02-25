from rest_framework.routers import DefaultRouter
from django.urls import path

from project_tracker import viewsets

router = DefaultRouter()

router.register(prefix="projects", viewset=viewsets.ProjectViewSet, basename="project")
router.register(prefix="tasks", viewset=viewsets.TaskViewSet, basename="task")

urlpatterns = router.urls

urlpatterns += [
    path(
        "tasks/<int:pk>/requests/<int:request_id>/",
        viewsets.TaskViewSet.as_view({"get": "requests", "delete": "requests"}),
        name="task-requests",
    ),
]
