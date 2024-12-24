from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Certificate
from .serializers import CertificateSerializer

class CertificateListView(APIView):
    def get(self, request):
        certificates = Certificate.objects.all()
        serializer = CertificateSerializer(certificates, many=True)
        return Response(serializer.data)
