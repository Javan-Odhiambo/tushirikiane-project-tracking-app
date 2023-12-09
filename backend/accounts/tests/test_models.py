from django.contrib.auth import get_user_model
from django.test import TestCase

User = get_user_model()


# Create your tests here.
class UserModelTestCase(TestCase):
    """Test cases for User model"""

    @classmethod
    def setUpTestData(cls):
        """Create a user for testing"""
        cls.user = User.objects.create_user(
            first_name="John",
            middle_name="Stephen",
            last_name="Doe",
            email="test@gmail.com",
            password="password",
        )

    def test_field_first_name(self):
        """Test first_name field"""
        field_label = self.user._meta.get_field("first_name").verbose_name
        max_length = self.user._meta.get_field("first_name").max_length
        self.assertEqual(field_label, "first name")
        self.assertEqual(max_length, 50)

    def test_field_middle_name(self):
        """Test middle_name field"""
        field_label = self.user._meta.get_field("middle_name").verbose_name
        max_length = self.user._meta.get_field("middle_name").max_length
        null = self.user._meta.get_field("middle_name").null
        blank = self.user._meta.get_field("middle_name").blank

        self.assertEqual(field_label, "middle name")
        self.assertEqual(max_length, 50)
        self.assertEqual(blank, True)
        self.assertEqual(null, True)

    def test_field_last_name(self):
        """Test last_name field"""
        field_label = self.user._meta.get_field("last_name").verbose_name
        max_length = self.user._meta.get_field("last_name").max_length
        self.assertEqual(field_label, "last name")
        self.assertEqual(max_length, 50)

    def test_field_created_at(self):
        """Test created_at field"""
        field_name = self.user._meta.get_field("created_at").verbose_name
        auto_now_add = self.user._meta.get_field("created_at").auto_now_add
        self.assertEqual(field_name, "created at")
        self.assertEqual(auto_now_add, True)

    def test_field_updated_at(self):
        """Test updated_at field"""
        field_name = self.user._meta.get_field("updated_at").verbose_name
        auto_now = self.user._meta.get_field("updated_at").auto_now
        self.assertEqual(field_name, "updated at")
        self.assertEqual(auto_now, True)

    def test_field_is_active(self):
        """Test is_active field"""
        field_name = self.user._meta.get_field("is_active").verbose_name
        default = self.user._meta.get_field("is_active").default
        self.assertEqual(field_name, "is active")
        self.assertEqual(default, True)

    def test_str(self):
        """Test __str__ method"""
        self.assertEqual(str(self.user), "John Doe")
