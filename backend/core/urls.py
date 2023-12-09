from django.urls import path

from core.views import test

urlpatterns = [
    path("test/", test, name="test"),
]
