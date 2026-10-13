import uuid

from django.core.validators import MinLengthValidator
from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()

    image = models.ImageField(
        upload_to="projects/",
        blank=True,
    )

    technologies = models.CharField(
        max_length=300,
        help_text="Separate technologies with commas, e.g. React, Django, Tailwind CSS",
    )

    live_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)

    is_featured = models.BooleanField(
        default=False,
        help_text="Select this project for the featured section.",
    )

    display_order = models.PositiveIntegerField(
        default=0,
        help_text="Lower numbers appear first.",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["display_order", "-created_at", "-id"]

    def __str__(self):
        return self.title


class ContactEnquiry(models.Model):
    submission_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=254)
    subject = models.CharField(max_length=200)
    message = models.TextField(max_length=5000, validators=[MinLengthValidator(20)])
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    notified_at = models.DateTimeField(null=True, blank=True, editable=False)

    class Meta:
        ordering = ["-created_at", "-id"]
        verbose_name_plural = "Contact enquiries"

    def __str__(self):
        return f"{self.name} — {self.subject}"
