from django.contrib import admin

from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "is_featured",
        "display_order",
        "updated_at",
    )

    list_display_links = ("title",)
    list_editable = ("is_featured", "display_order")
    list_filter = ("is_featured",)
    search_fields = ("title", "technologies", "description")
    readonly_fields = ("created_at", "updated_at")