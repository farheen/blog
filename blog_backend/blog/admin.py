from django.contrib import admin
from .models import Blog, BlogBlock

class BlogBlockInline(admin.TabularInline):
    model = BlogBlock
    extra = 1  # Number of empty block forms to display

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'category')  # Ensure these fields are valid
    list_filter = ('category', 'created_at')
    search_fields = ('title', 'content')
    inlines = [BlogBlockInline] 



