from django.urls import path
from blog_backend.projects.views import ProjectListView, ProjectDetailView

urlpatterns = [
    path('', ProjectListView.as_view(), name='project-list'),  # Matches `/api/projects/`
    path('<int:id>/', ProjectDetailView.as_view(), name='project-detail'),  # Matches `/api/projects/<id>/`
]
