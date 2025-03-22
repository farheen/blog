from django.db import models

class Certificate(models.Model):
    title = models.CharField(max_length=255)
    issuer = models.CharField(max_length=255)
    description = models.TextField()
    date_issued = models.DateField()
    certificate_link = models.URLField()
    thumbnail = models.ImageField(upload_to='certificates/thumbnails/', blank=True, null=True)
    class Meta:
        app_label = 'blog_backend.certificates'

    def __str__(self):
        return self.title

