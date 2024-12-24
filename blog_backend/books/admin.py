# books/admin.py
from django.contrib import admin
from .models import Book  # Import the Book model

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'genre', 'purchase_link_india', 'purchase_link_international', 'created_at')  # Ensure these fields exist
    list_filter = ('genre', 'author', 'created_at')
    search_fields = ('title', 'author', 'genre', 'description')
    date_hierarchy = 'created_at'
    list_editable = ('genre',)
    ordering = ('-created_at',)

