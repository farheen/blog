import re
from django.core.management.base import BaseCommand
from blog.models import Blog

class Command(BaseCommand):
    help = 'Remove HTML tags from all blogs'

    def clean_html(self, raw_html):
        return re.sub(r'<.*?>', '', raw_html).strip()

    def handle(self, *args, **kwargs):
        blogs = Blog.objects.all()
        for blog in blogs:
            original_content = blog.content
            blog.content = self.clean_html(blog.content)
            blog.save()
            self.stdout.write(
                self.style.SUCCESS(f'Cleaned HTML tags for blog: {blog.title}')
            )

        self.stdout.write(self.style.SUCCESS('HTML tags removed from all blogs.'))

