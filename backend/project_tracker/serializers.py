from django.contrib.auth import get_user_model
from rest_framework import serializers

from accounts.serializers import UserSerializer
from project_tracker import models


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Project

        fields = [
            "id",
            "url",
            "title",
            "description",
            "is_active",
        ]
        read_only_fields = ["created_at", "updated_at"]

    def create(self, validated_data):
        user = self.context["request"].user
        project = models.Project.objects.create(**validated_data)
        models.Member.objects.create(
            user=user, project=project, is_admin=True, is_owner=True
        )
        return project

    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.description = validated_data.get("description", instance.description)
        instance.is_active = validated_data.get("is_active", instance.is_active)
        instance.save()
        return instance


class MemberSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = models.Member
        fields = ["user", "is_admin", "is_owner"]


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    assignee = UserSerializer(read_only=True)
    assignor = UserSerializer(read_only=True)

    class Meta:
        model = models.Task
        fields = [
            "id",
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


class RequestSerializer(serializers.ModelSerializer):
    member = UserSerializer(read_only=True)
    task = TaskSerializer()

    class Meta:
        model = models.Request
        fields = ["id", "task", "member", "status", "created_at", "updated_at"]
