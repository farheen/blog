import os
import re

from django.core.management.base import BaseCommand
from blog_backend.blog.models import Blog

WP_COMMENT = re.compile(r"<!--\s*/?wp:.*?-->", re.S)
FIGURE_IMG = re.compile(r'<figure[^>]*>\s*<img[^>]*src="([^"]+)"[^>]*/?>\s*</figure>', re.S)
STRONG = re.compile(r"<(strong|b)>(.*?)</\1>", re.S)
EM = re.compile(r"<(em|i)>(.*?)</\1>", re.S)
EXTRA_BLANK_LINES = re.compile(r"(\r?\n){3,}")


class Command(BaseCommand):
    help = "Convert leftover WordPress HTML in Personal blogs into Markdown, keeping images"

    def add_arguments(self, parser):
        parser.add_argument(
            "--media-base",
            default="https://blog-backend-n1tx.onrender.com",
            help="Absolute URL the frontend should load inline images from",
        )
        parser.add_argument("--dry-run", action="store_true", help="Show which posts would change")

    def tidy(self, content, media_base):
        def image(match):
            filename = os.path.basename(match.group(1))
            return f"![]({media_base}/media/blog_images/{filename})"

        content = WP_COMMENT.sub("", content)
        content = FIGURE_IMG.sub(image, content)
        content = STRONG.sub(r"**\2**", content)
        content = EM.sub(r"*\2*", content)
        content = EXTRA_BLANK_LINES.sub("\r\n\r\n", content)
        return content.strip()

    def handle(self, *args, **options):
        for blog in Blog.objects.filter(category="Personal"):
            tidied = self.tidy(blog.content, options["media_base"])
            if tidied == blog.content:
                continue
            if not options["dry_run"]:
                blog.content = tidied
                blog.save(update_fields=["content", "updated_at"])
            prefix = "Would tidy" if options["dry_run"] else "Tidied"
            self.stdout.write(self.style.SUCCESS(f"{prefix} blog #{blog.id}: {blog.title}"))
