from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from blog_backend.blog.models import Blog
from blog_backend.blog.serializers import BlogSerializer


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