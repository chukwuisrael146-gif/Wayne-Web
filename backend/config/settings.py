import os
from pathlib import Path

import dj_database_url
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")
DEBUG = os.environ.get("DJANGO_DEBUG", "True").lower() == "true"
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "")
if not SECRET_KEY:
    if DEBUG:
        SECRET_KEY = "local-development-only-change-before-deployment"
    else:
        raise RuntimeError("DJANGO_SECRET_KEY must be set in production")
ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
]

railway_domain = (
    os.environ.get("RAILWAY_PUBLIC_DOMAIN")
    or "backend-production-c2015.up.railway.app"
)

ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    railway_domain,
]

CSRF_TRUSTED_ORIGINS = [
    f"https://{railway_domain}",
]

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SESSION_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SECURE = not DEBUG

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "portfolio.apps.PortfolioConfig",
]
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]
ROOT_URLCONF = "config.urls"
TEMPLATES = [{
    "BACKEND": "django.template.backends.django.DjangoTemplates",
    "DIRS": [],
    "APP_DIRS": True,
    "OPTIONS": {"context_processors": [
        "django.template.context_processors.request",
        "django.contrib.auth.context_processors.auth",
        "django.contrib.messages.context_processors.messages",
    ]},
}]
WSGI_APPLICATION = "config.wsgi.application"

database_url = os.environ.get("DATABASE_URL")

if not database_url:
    raise RuntimeError("DATABASE_URL is missing. Add it to backend/.env.")
DATABASES = {
    "default": dj_database_url.parse(
        database_url,
        conn_max_age=60,
        conn_health_checks=True,
        ssl_require=True,
    )
}
LANGUAGE_CODE = "en-us"
TIME_ZONE = "Africa/Lagos"
USE_I18N = True
USE_TZ = True
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

if os.environ.get("AWS_STORAGE_BUCKET_NAME"):
    STORAGES["default"] = {
        "BACKEND": "storages.backends.s3.S3Storage",
        "OPTIONS": {
            "bucket_name": os.environ["AWS_STORAGE_BUCKET_NAME"],
            "access_key": os.environ["AWS_ACCESS_KEY_ID"],
            "secret_key": os.environ["AWS_SECRET_ACCESS_KEY"],
            "endpoint_url": os.environ["AWS_S3_ENDPOINT_URL"],
            "region_name": os.environ["AWS_S3_REGION_NAME"],
            "addressing_style": os.environ.get(
                "AWS_S3_ADDRESSING_STYLE", "virtual"
            ),
            "signature_version": "s3v4",
            "default_acl": None,
            "querystring_auth": True,
            "querystring_expire": 3600,
            "file_overwrite": False,
        },
    }
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"
