from django.db import models

class Blog(models.Model):
    id = models.CharField(max_length=255, primary_key=True)  # Set as primary key
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='blog_images/', null=True, blank=True)
    author = models.CharField(max_length=255, blank=True, null=True)
    published_date = models.DateTimeField(blank=True, null=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def abstract(self):
        return self.content[:50] + "..."  # First 100 characters as summary

    def __str__(self):
        return self.title

