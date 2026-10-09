from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

from .models import Project
from .serializers import ProjectSerializer


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