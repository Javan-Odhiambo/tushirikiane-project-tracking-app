from django.contrib.auth import get_user_model
from rest_framework import serializers

from accounts.serializers import UserSerializer
from project_tracker import models


class MemberSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer()

    class Meta:
        model = models.Member
        fields = ["url", "user", "project", "is_admin", "is_owner"]


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    members = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name="member-detail",
    )

    class Meta:
        model = models.Project
        fields = [
            "url",
            "title",
            "description",
            "members",
            "is_active",
            "created_at",
            "updated_at",
        ]


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    assignee = UserSerializer(read_only=True)
    assignor = UserSerializer(read_only=True)

    class Meta:
        model = models.Task
        fields = [
            "url",
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
        ]
        read_only_fields = ["project"]


class RequestSerializer(serializers.HyperlinkedModelSerializer):
    member = UserSerializer()

    class Meta:
        model = models.Request
        fields = ["url", "member", "task", "status", "created_at", "updated_at"]
