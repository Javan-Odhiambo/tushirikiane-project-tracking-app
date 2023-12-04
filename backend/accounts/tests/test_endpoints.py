import json

from django.contrib.auth import get_user_model
from django.test import RequestFactory
from rest_framework.reverse import reverse
from rest_framework.test import APIClient, APITestCase


class AuthTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user_data = {
            "email": "test@gmail.com",
            "first_name": "Test",
            "middle_name": "Test",
            "last_name": "Test",
            "password": "test",
            "re_password": "test",
        }
        cls.client = APIClient()
        cls.factory = RequestFactory()
        cls.request = cls.factory.get("/")

    def test_registration(self):
        url = "/auth/users/"
        response = self.client.post(url, data={})
        self.assertEqual(response.status_code, 201)

    def test_login(self):
        ...
