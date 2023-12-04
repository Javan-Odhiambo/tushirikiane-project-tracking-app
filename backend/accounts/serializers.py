from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer, UserSerializer


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = get_user_model()
        fields = [
            "id",
            "email",
            "first_name",
            "middle_name",
            "last_name",
            "password",
        ]


class UserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = get_user_model()
        fields = [
            "email",
            "first_name",
            "middle_name",
            "last_name",
            "is_active",
            "profile_picture",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "is_active",
            "created_at",
            "updated_at",
        ]
