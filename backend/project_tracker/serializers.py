from accounts.serializers import CustomUserSerializer
from django.contrib.auth import get_user_model
from project_tracker import models
from rest_framework import serializers


class MemberSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = models.Member
        fields = ["id", "user", "is_admin", "is_owner"]


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Project

        fields = [
            "id",
            "title",
            "description",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at"]

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["is_active"] = True
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


class TaskSerializer(serializers.ModelSerializer):
    assignee = CustomUserSerializer(read_only=True)
    assignor = CustomUserSerializer(read_only=True)
    created_by = CustomUserSerializer(read_only=True)

    class Meta:
        model = models.Task
        fields = [
            "id",
            "title",
            "description",
            "project",
            "status",
            "assignee",
            "assignor",
            "created_by",
            "start_at",
            "due_at",
            "completed_at",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["project"]

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["created_by"] = user
        print(validated_data)
        task = models.Task.objects.create(**validated_data)
        return task


class TaskRequestSerializer(serializers.ModelSerializer):
    member = CustomUserSerializer(read_only=True)

    class Meta:
        model = models.Request
        fields = ["id", "task", "member", "status", "created_at", "updated_at"]
