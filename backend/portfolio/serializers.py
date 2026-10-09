from rest_framework import serializers

from .models import Project


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