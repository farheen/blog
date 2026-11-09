from pathlib import Path

from django.core.management.base import BaseCommand
from blog_backend.blog.management.commands.seed_tech_blogs import parse_post
from blog_backend.projects.models import Project

CONTENT_DIR = Path(__file__).resolve().parents[2] / "content"


class Command(BaseCommand):
    help = "Create or update the projects stored in projects/content/"

    def handle(self, *args, **options):
        for path in sorted(CONTENT_DIR.glob("*.md")):
            fields, body = parse_post(path)
            project, created = Project.objects.update_or_create(
                title=fields["title"],
                defaults={
                    "description": body,
                    "image": fields.get("image", ""),
                    "code_url": fields.get("code_url") or None,
                    "blog_url": fields.get("blog_url") or None,
                },
            )
            action = "Created" if created else "Updated"
            self.stdout.write(self.style.SUCCESS(f"{action} project #{project.id}: {project.title}"))
