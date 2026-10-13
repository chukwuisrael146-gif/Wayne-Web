from rest_framework import serializers

import uuid

from .models import ContactEnquiry, Project


class ProjectSerializer(serializers.ModelSerializer):
    technologies = serializers.SerializerMethodField()
    liveUrl = serializers.URLField(
        source="live_url",
        read_only=True,
    )
    githubUrl = serializers.URLField(
        source="github_url",
        read_only=True,
    )
    isFeatured = serializers.BooleanField(
        source="is_featured",
        read_only=True,
    )

    class Meta:
        model = Project
        fields = (
            "id",
            "title",
            "description",
            "image",
            "technologies",
            "liveUrl",
            "githubUrl",
            "isFeatured",
        )
        read_only_fields = fields

    def get_technologies(self, project):
        return [
            technology.strip()
            for technology in project.technologies.split(",")
            if technology.strip()
        ]


class ContactEnquirySerializer(serializers.ModelSerializer):
    submission_id = serializers.UUIDField(default=uuid.uuid4)
    message = serializers.CharField(min_length=20, max_length=5000, trim_whitespace=True)
    website = serializers.CharField(required=False, allow_blank=True, write_only=True, max_length=200)

    class Meta:
        model = ContactEnquiry
        fields = ("submission_id", "name", "email", "subject", "message", "website")

    def validate_subject(self, value):
        if "\n" in value or "\r" in value:
            raise serializers.ValidationError("Enter a subject on one line.")
        return value
