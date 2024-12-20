from rest_framework import serializers
from .models import Blog

class BlogSerializer(serializers.ModelSerializer):
    html_content = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = ['id', 'title', 'image', 'author', 'published_date', 'content', 'html_content', 'created_at', 'updated_at' , 'category']

    def get_html_content(self, obj):
        return obj.get_markdown_content()

