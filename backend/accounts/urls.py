from django.urls import include, path

from .views import (
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
    CustomTokenVerifyView,
    LogoutView,
)

urlpatterns = [
    path("auth/", include("djoser.urls")),
    path(
        "auth/jwt/create/",
        view=CustomTokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    path(
        "auth/jwt/refresh/", view=CustomTokenRefreshView.as_view(), name="token_refresh"
    ),
    path("auth/jwt/verify/", view=CustomTokenVerifyView.as_view(), name="token_verify"),
    path("auth/logout/", view=LogoutView.as_view(), name="auth_logout"),
]
