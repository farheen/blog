from rest_framework.views import APIView
from rest_framework.response import Response
from blog_backend.certificates.models import Certificate
from blog_backend.certificates.serializers import CertificateSerializer

class CertificateListView(APIView):
    def get(self, request):
        certificates = Certificate.objects.all()
        serializer = CertificateSerializer(certificates, many=True)
        return Response(serializer.data)
