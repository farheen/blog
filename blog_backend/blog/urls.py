from django.urls import path
from .views import BlogView, BlogListView # This imports the view
 
urlpatterns = [
    path('api/blog/', BlogListView.as_view(), name='api_blog'),
    path('api/blog/<int:id>/', BlogView.as_view(), name='blog'), 
]
