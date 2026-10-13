from django.urls import path

from .views import ContactEnquiryView, ProjectListView


urlpatterns = [
    path("contact/", ContactEnquiryView.as_view(), name="contact-enquiry"),
    path(
        "projects/",
        ProjectListView.as_view(),
        name="project-list",
    ),
]
