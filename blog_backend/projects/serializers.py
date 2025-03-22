from rest_framework import serializers
from blog_backend.projects.models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id','title', 'description', 'image', 'code_url', 'blog_url']

