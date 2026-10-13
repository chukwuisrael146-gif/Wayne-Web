"""Isolated tests: never migrate or write to the Railway database or bucket."""

import os

os.environ.setdefault("DATABASE_URL", "postgresql://unused:unused@localhost/unused")
os.environ.setdefault("DJANGO_SECRET_KEY", "isolated-test-secret")

from .settings import *  # noqa: E402, F403

DATABASES = {"default": {"ENGINE": "django.db.backends.sqlite3", "NAME": ":memory:"}}
STORAGES = {
    "default": {"BACKEND": "django.core.files.storage.InMemoryStorage"},
    "staticfiles": {"BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"},
}
RESEND_API_KEY = ""
CONTACT_FROM_EMAIL = ""
REST_FRAMEWORK = {"NUM_PROXIES": 0}
PASSWORD_HASHERS = ["django.contrib.auth.hashers.MD5PasswordHasher"]
