from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    cover_pic = serializers.ImageField(required=False)  # Include this field

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'genre', 'description', 'purchase_link_india', 'purchase_link_international', 'cover_pic', 'created_at']

