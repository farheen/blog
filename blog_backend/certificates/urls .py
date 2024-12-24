from django.urls import path
from .views import CertificateListView
router = DefaultRouter()
urlpatterns = [
    path('certificates/', CertificateListView.as_view(), name='CertificateListView'),
]
urlpatterns = router.urls