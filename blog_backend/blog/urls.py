from django.contrib import admin
from django.urls import path, include
from django.conf import settings  # Import settings
from django.conf.urls.static import static 
from . import views
from books.views import BookViewSet
from .views import BlogView, BlogListView, blog_list # This imports the view
from projects.views import ProjectListView, ProjectDetailView
 
urlpatterns = [
    path('admin/', admin.site.urls),
    path('markdownx/', include('markdownx.urls')), 
    path('api/blog/', BlogListView.as_view(), name='api_blog'),
    path('api/blog/<int:id>/', BlogView.as_view(), name='blog'), 
    path('api/blog/', views.blog_list, name='blog_list'),
    path('api/blog/category/', views.blog_list, name='filtered_blog_list'),
    path('api/projects/', ProjectListView.as_view(), name='project-list'),  # Matches `/api/projects/`
    path('api/projects/<int:id>/', ProjectDetailView.as_view(), name='project-detail'), 
    path('api/', include('books.urls')),
]

if settings.DEBUG:
    # Serve static and media files in development
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)








