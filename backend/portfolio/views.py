from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView

from .models import ContactEnquiry, Project
from .notifications import notify_enquiry
from .serializers import ContactEnquirySerializer, ProjectSerializer


class ProjectListView(ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]
    pagination_class = None

    queryset = Project.objects.order_by(
        "-is_featured",
        "display_order",
        "-created_at",
        "-id",
    )

    def finalize_response(self, request, response, *args, **kwargs):
        response = super().finalize_response(request, response, *args, **kwargs)
        # Screenshot URLs are signed and expire, so always fetch fresh links.
        response["Cache-Control"] = "no-store"
        return response


class ContactThrottle(AnonRateThrottle):
    rate = "5/hour"


class ContactEnquiryView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    throttle_classes = [ContactThrottle]

    def post(self, request):
        serializer = ContactEnquirySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        values = dict(serializer.validated_data)
        honeypot = values.pop("website", "")
        acknowledgement = {"message": "Thanks! Your enquiry has been received. I’ll get back to you by email."}
        if honeypot:
            return Response(acknowledgement, status=201)

        submission_id = values.pop("submission_id")
        enquiry, created = ContactEnquiry.objects.get_or_create(
            submission_id=submission_id, defaults=values,
        )
        if not created and any(getattr(enquiry, key) != value for key, value in values.items()):
            return Response({"detail": "Please start a new submission for a different message."}, status=409)
        if created:
            notify_enquiry(enquiry)
        return Response(acknowledgement, status=201 if created else 200)
