from rest_framework.routers import DefaultRouter

from project_tracker import viewsets

router = DefaultRouter()

router.register(prefix="projects", viewset=viewsets.ProjectViewSet, basename="project")
router.register(prefix="tasks", viewset=viewsets.TaskViewSet, basename="task")

urlpatterns = router.urls
