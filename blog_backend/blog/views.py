from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Blog
from .serializers import BlogSerializer
from django.http import HttpResponse
from django.conf import settings
from django.shortcuts import get_object_or_404, render
import json
import re

def home(request):
    return HttpResponse("Blog Backend is Running ✅")


class BlogListView(APIView):
    def get(self, request):
        blogs = Blog.objects.all()
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class BlogView(APIView):
    def get(self, request, id):  # Correct parameter name 'id'
        try:
            blog = Blog.objects.get(id=id)  # Fetch blog by ID
        except Blog.DoesNotExist:
            return Response({'error': 'Blog not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = BlogSerializer(blog)
        return Response(serializer.data, status=status.HTTP_200_OK)


def blog_list(request):
    category = request.GET.get('category', None)
    if category:
        blogs = Blog.objects.filter(category=category)
    else:
        blogs = Blog.objects.all()

    blogs_data = [
        {
            "id": blog.id,
            "title": blog.title,
            "author": blog.author,
            "abstract": blog.abstract(),
            "image_url": blog.image.url if blog.image else None,
            "category": blog.category,
        }
        for blog in blogs
    ]

    return JsonResponse(blogs_data, safe=False)

def _summary(markdown_text, limit=200):
    """Plain-text preview for link cards: first words of the post, without Markdown."""
    text = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", markdown_text)      # images
    text = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", text)            # links -> their text
    text = re.sub(r"<[^>]+>|[*_#>`]", "", text)                     # HTML and Markdown symbols
    text = re.sub(r"\s+", " ", text).strip()
    return text if len(text) <= limit else text[:limit].rsplit(" ", 1)[0] + "…"


def share_blog(request, id):
    """Link-preview page for social sites, which don't run the React app; people are redirected to the post."""
    blog = get_object_or_404(Blog, id=id)
    post_url = f"{settings.FRONTEND_URL}/blogs/{blog.id}"
    return render(request, "blog/share.html", {
        "blog": blog,
        "summary": _summary(blog.content),
        "post_url": post_url,
        "post_url_json": json.dumps(post_url),
        "share_url": request.build_absolute_uri(),
        "image_url": request.build_absolute_uri(blog.image.url) if blog.image else None,
    })
