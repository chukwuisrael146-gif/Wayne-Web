from django.contrib import admin

from .models import ContactEnquiry, Project
from .notifications import notify_enquiry


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


@admin.register(ContactEnquiry)
class ContactEnquiryAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "is_read", "created_at", "notified_at")
    list_display_links = ("name",)
    list_editable = ("is_read",)
    list_filter = ("is_read", "created_at")
    search_fields = ("name", "email", "subject", "message")
    readonly_fields = (
        "submission_id", "name", "email", "subject", "message", "created_at", "notified_at",
    )
    actions = ("mark_read", "retry_notifications")

    def has_add_permission(self, request):
        return False

    @admin.action(description="Mark selected enquiries as read")
    def mark_read(self, request, queryset):
        count = queryset.update(is_read=True)
        self.message_user(request, f"Marked {count} enquiries as read.")

    @admin.action(description="Retry email notifications for selected enquiries")
    def retry_notifications(self, request, queryset):
        sent = sum(notify_enquiry(enquiry) for enquiry in queryset.filter(notified_at=None)[:20])
        self.message_user(request, f"Sent {sent} notifications (up to 20 per action). Check email settings if none were sent.")
