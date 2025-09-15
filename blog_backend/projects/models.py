from django.db import models
from markdownx.models import MarkdownxField

class Project(models.Model):
    id = models.BigAutoField(primary_key=True) 
    title = models.CharField(max_length=255)  # Project title
    description = MarkdownxField()  # Markdown-enabled description
    image = models.ImageField(upload_to='project_images/', null=True, blank=True) 
    code_url = models.URLField(max_length=500, blank=True, null=True)  # Link to the code repository
    blog_url = models.URLField(max_length=500, blank=True, null=True)  # Link to the associated blog
    embed_url = models.URLField(max_length=500, null=True, blank=True)  # NEW
    created_at = models.DateTimeField(auto_now_add=True)  # Auto-added timestamp for creation
    updated_at = models.DateTimeField(auto_now=True)  # Auto-updated timestamp for updates

    def __str__(self):
        return self.title

    def abstract(self):
        return self.description[:50] + "..."  # Provide a short summary of the description
