from datetime import datetime
from pathlib import Path

from django.core.management.base import BaseCommand
from django.utils.timezone import make_aware
from blog_backend.blog.models import Blog

CONTENT_DIR = Path(__file__).resolve().parents[2] / "content" / "tech"


def parse_post(path):
    """Split a post file into its header fields and Markdown body.

    Files start with `key: value` lines, then a `---` line, then the body.
    """
    header, _, body = path.read_text(encoding="utf-8").partition("\n---\n")
    fields = {}
    for line in header.splitlines():
        key, _, value = line.partition(":")
        fields[key.strip()] = value.strip()
    return fields, body.strip()


class Command(BaseCommand):
    help = "Create or update the Tech blog posts stored in blog/content/tech/"

    def add_arguments(self, parser):
        parser.add_argument("--author", default="Farheen Zahara", help="Author name for the posts")

    def handle(self, *args, **options):
        for path in sorted(CONTENT_DIR.glob("*.md")):
            fields, body = parse_post(path)
            published = make_aware(datetime.strptime(fields["date"], "%Y-%m-%d"))

            blog, created = Blog.objects.update_or_create(
                title=fields["title"],
                category="Tech",
                defaults={
                    "content": body,
                    "author": options["author"],
                    "published_date": published,
                    "image": fields.get("image", ""),
                },
            )
            action = "Created" if created else "Updated"
            self.stdout.write(self.style.SUCCESS(f"{action} blog #{blog.id}: {blog.title}"))
