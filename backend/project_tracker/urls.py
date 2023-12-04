from rest_framework.routers import DefaultRouter

from project_tracker.viewsets import MemberViewSet, ProjectViewSet, TaskViewSet

router = DefaultRouter()

router.register("projects", ProjectViewSet)
router.register("tasks", TaskViewSet)
router.register("members", MemberViewSet)

urlpatterns = router.urls
