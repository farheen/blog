# books/views.py
from rest_framework import viewsets
from blog_backend.books.models import Book
from blog_backend.books.serializers import BookSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

