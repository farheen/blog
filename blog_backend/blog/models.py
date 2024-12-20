from django.db import models
from django.utils.timezone import now
import markdown


class Blog(models.Model):
    # Define CATEGORY_CHOICES before using it
    CATEGORY_CHOICES = [
        ("Personal", "Personal"),
        ("Tech", "Tech"),
    ]
    id = models.BigAutoField(primary_key=True) 
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to="blog_images/", null=True, blank=True)
    author = models.CharField(max_length=255, null=True, blank=True, default="Anonymous")
    abstract = models.TextField()
    content = models.TextField()
    published_date = models.DateTimeField(default=now)
    created_at = models.DateTimeField(auto_now_add=True)  # Ensure this field is present
    updated_at = models.DateTimeField(auto_now=True)   
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default="Tech")  # Use CATEGORY_CHOICES here


    def abstract(self):
        return self.content[:50] + "..."  # First 50 characters as a summary

    def get_markdown_content(self):
        # Converts the Markdown content to HTML
        return markdown.markdown(self.content)

    def __str__(self):
        return self.title
