from django.contrib import admin
from .models import Blog

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'category')  # Ensure these fields are valid
    list_filter = ('category', 'created_at')
    search_fields = ('title', 'content')
