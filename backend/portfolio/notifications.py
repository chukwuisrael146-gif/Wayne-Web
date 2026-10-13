"""Optional Resend notifications. An email failure never loses an enquiry."""

import json
import logging
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from django.conf import settings
from django.utils import timezone

logger = logging.getLogger(__name__)


def notify_enquiry(enquiry):
    if enquiry.notified_at or not settings.RESEND_API_KEY or not settings.CONTACT_FROM_EMAIL:
        return False

    payload = {
        "from": settings.CONTACT_FROM_EMAIL,
        "to": [settings.CONTACT_TO_EMAIL],
        "reply_to": enquiry.email,
        "subject": f"Portfolio enquiry: {enquiry.subject}",
        "text": (
            f"Name: {enquiry.name}\nEmail: {enquiry.email}\n"
            f"Subject: {enquiry.subject}\n\n{enquiry.message}\n\n"
            f"Manage this enquiry in Django Admin (ID {enquiry.pk})."
        ),
    }
    request = Request(
        "https://api.resend.com/emails",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {settings.RESEND_API_KEY}",
            "Content-Type": "application/json",
            "User-Agent": "ChukwuIsraelPortfolio/1.0",
            "Idempotency-Key": f"contact-{enquiry.submission_id}",
        },
        method="POST",
    )
    try:
        with urlopen(request, timeout=8) as response:
            result = json.load(response)
        if not isinstance(result, dict) or not result.get("id"):
            logger.warning("Email provider did not acknowledge enquiry %s", enquiry.pk)
            return False
    except (HTTPError, URLError, TimeoutError, OSError, ValueError):
        # Do not log provider responses, credentials, or visitors' personal data.
        logger.warning("Email notification failed for enquiry %s; retry from Admin", enquiry.pk)
        return False

    enquiry.notified_at = timezone.now()
    enquiry.save(update_fields=["notified_at"])
    return True
