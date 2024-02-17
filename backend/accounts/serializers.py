from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer, UserSerializer


class CustomUserCreateSerializer(UserCreateSerializer):
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


class CustomUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = get_user_model()
        fields = [
            "email",
            "first_name",
            "middle_name",
            "last_name",
            "profile_picture",

        ]