from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    genre = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)
    purchase_link_india = models.URLField(max_length=500, blank=True, null=True)  # New field for Indian purchase link
    purchase_link_international = models.URLField(max_length=500, blank=True, null=True)
    cover_pic = models.ImageField(upload_to='book_covers/', blank=True, null=True)  # Add this field
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
