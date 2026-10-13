import io
import json
import uuid
from unittest.mock import patch
from urllib.error import URLError

from django.core.cache import cache
from django.test import TestCase, override_settings
from rest_framework.test import APIClient

from .models import ContactEnquiry, Project
from .notifications import notify_enquiry


class ContactTests(TestCase):
    def setUp(self):
        cache.clear()
        self.client = APIClient()
        self.payload = {
            "submission_id": str(uuid.uuid4()),
            "name": "Test visitor",
            "email": "visitor@example.com",
            "subject": "Website project",
            "message": "I would like to discuss a new website for my business.",
            "website": "",
        }

    def post(self, **changes):
        return self.client.post("/api/contact/", {**self.payload, **changes}, format="json")

    @patch("portfolio.views.notify_enquiry")
    def test_submission_and_retry_save_once(self, notify):
        self.assertEqual(self.post().status_code, 201)
        self.assertEqual(self.post().status_code, 200)
        self.assertEqual(ContactEnquiry.objects.count(), 1)
        notify.assert_called_once()
        self.assertEqual(ContactEnquiry.objects.get().email, "visitor@example.com")

    def test_reused_id_with_different_message_is_rejected(self):
        self.post()
        self.assertEqual(self.post(message="This is a different enquiry with the same identifier.").status_code, 409)
        self.assertEqual(ContactEnquiry.objects.count(), 1)

    def test_invalid_fields_do_not_save(self):
        response = self.post(email="invalid", message="Too short", name="   ")
        self.assertEqual(response.status_code, 400)
        self.assertTrue({"email", "message", "name"}.issubset(response.data))
        self.assertEqual(ContactEnquiry.objects.count(), 0)

    def test_subject_header_injection_is_rejected(self):
        self.assertEqual(self.post(subject="Hi\r\nBcc: other@example.com").status_code, 400)

    def test_honeypot_does_not_store_or_email(self):
        with patch("portfolio.views.notify_enquiry") as notify:
            self.assertEqual(self.post(website="spam.example").status_code, 201)
            self.assertEqual(ContactEnquiry.objects.count(), 0)
            notify.assert_not_called()

    def test_messages_cannot_be_listed_publicly(self):
        self.post()
        response = self.client.get("/api/contact/")
        self.assertEqual(response.status_code, 405)
        self.assertNotIn(self.payload["email"], str(response.data))

    def test_attempts_are_throttled(self):
        for attempt in range(5):
            self.assertEqual(self.post().status_code, 201 if attempt == 0 else 200)
        self.assertEqual(self.post().status_code, 429)

    @override_settings(RESEND_API_KEY="test-key", CONTACT_FROM_EMAIL="Portfolio <hello@example.com>")
    @patch("portfolio.notifications.urlopen", side_effect=URLError("offline"))
    def test_email_failure_does_not_lose_message(self, send):
        self.assertEqual(self.post().status_code, 201)
        enquiry = ContactEnquiry.objects.get()
        self.assertIsNone(enquiry.notified_at)
        send.assert_called_once()

    @override_settings(RESEND_API_KEY="test-key", CONTACT_FROM_EMAIL="Portfolio <hello@example.com>")
    @patch("portfolio.notifications.urlopen")
    def test_notification_reply_address_and_delivery_tracking(self, send):
        send.return_value.__enter__.return_value = io.BytesIO(b'{"id":"test-email"}')
        values = {key: value for key, value in self.payload.items() if key != "website"}
        enquiry = ContactEnquiry.objects.create(**values)
        self.assertTrue(notify_enquiry(enquiry))
        enquiry.refresh_from_db()
        self.assertIsNotNone(enquiry.notified_at)
        request = send.call_args.args[0]
        self.assertEqual(json.loads(request.data)["reply_to"], self.payload["email"])
        self.assertFalse(notify_enquiry(enquiry))
        send.assert_called_once()

    @override_settings(RESEND_API_KEY="test-key", CONTACT_FROM_EMAIL="Portfolio <hello@example.com>")
    @patch("portfolio.notifications.urlopen")
    def test_unexpected_provider_response_does_not_lose_message(self, send):
        send.return_value.__enter__.return_value = io.BytesIO(b'[]')
        self.assertEqual(self.post().status_code, 201)
        self.assertIsNone(ContactEnquiry.objects.get().notified_at)

    @override_settings(CORS_ALLOWED_ORIGINS=["https://portfolio.example"])
    def test_cors_preflight_for_contact(self):
        response = self.client.options(
            "/api/contact/", HTTP_ORIGIN="https://portfolio.example",
            HTTP_ACCESS_CONTROL_REQUEST_METHOD="POST",
            HTTP_ACCESS_CONTROL_REQUEST_HEADERS="content-type",
        )
        self.assertEqual(response["Access-Control-Allow-Origin"], "https://portfolio.example")

    def test_projects_still_work_and_signed_urls_are_not_cached(self):
        Project.objects.create(title="Example", description="Project", technologies="React, Django")
        response = self.client.get("/api/projects/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]["technologies"], ["React", "Django"])
        self.assertEqual(response["Cache-Control"], "no-store")
