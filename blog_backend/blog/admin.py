from urllib.parse import quote

from django.contrib import admin
from django.shortcuts import get_object_or_404, redirect
from django.urls import path, reverse
from django.utils.html import format_html
from .models import Blog, BlogBlock

class BlogBlockInline(admin.TabularInline):
    model = BlogBlock
    extra = 1  # Number of empty block forms to display

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'category', 'share_on_linkedin')  # Ensure these fields are valid
    list_filter = ('category', 'created_at')
    search_fields = ('title', 'content')
    readonly_fields = ('share_on_linkedin',)
    inlines = [BlogBlockInline]

    def get_urls(self):
        share = path(
            '<int:blog_id>/share-linkedin/',
            self.admin_site.admin_view(self.share_linkedin_view),
            name='blog_blog_share_linkedin',
        )
        return [share] + super().get_urls()

    def share_linkedin_view(self, request, blog_id):
        """Staff-only: open LinkedIn's share dialog for the post's public preview page."""
        blog = get_object_or_404(Blog, id=blog_id)
        share_url = request.build_absolute_uri(reverse('share_blog', args=[blog.id]))
        return redirect(f"https://www.linkedin.com/sharing/share-offsite/?url={quote(share_url, safe='')}")

    @admin.display(description='LinkedIn')
    def share_on_linkedin(self, obj):
        if not obj.pk:
            return "Save the post first"
        return format_html(
            '<a class="button" href="{}" target="_blank" rel="noopener" '
            'style="background:#0A66C2;color:#fff;padding:4px 10px;border-radius:4px;">Share on LinkedIn</a>',
            reverse('admin:blog_blog_share_linkedin', args=[obj.pk]),
        )
