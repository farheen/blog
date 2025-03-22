from rest_framework.routers import DefaultRouter
from blog_backend.books.views import BookViewSet 

router = DefaultRouter()
router.register(r'books', BookViewSet, basename='book')

urlpatterns = router.urls