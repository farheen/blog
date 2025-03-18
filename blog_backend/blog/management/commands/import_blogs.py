import os
import re
import xml.etree.ElementTree as ET
from django.core.management.base import BaseCommand
from blog.models import Blog
from django.utils.html import strip_tags
from urllib.parse import urlparse, unquote


class Command(BaseCommand):
    help = "Import blogs and use existing images if available"

    def add_arguments(self, parser):
        parser.add_argument("file_path", type=str, help="Path to the WordPress XML file")

    def handle(self, *args, **options):
        file_path = options["file_path"]

        if not os.path.exists(file_path):
            self.stdout.write(self.style.ERROR(f"File not found: {file_path}"))
            return

        # Define namespaces
        namespaces = {'content': 'http://purl.org/rss/1.0/modules/content/'}

        # Parse the XML file
        tree = ET.parse(file_path)
        root = tree.getroot()
        channel = root.find("channel")

        # Define the target folder for images
        image_folder = "static/images/project_images"
        os.makedirs(image_folder, exist_ok=True)

        for item in channel.findall("item"):
            title = item.find("title").text
            content_encoded = item.find("content:encoded", namespaces)

            if content_encoded is not None:
                content = content_encoded.text
            else:
                content = None

            published_date_raw = item.find("pubDate").text

            if not title or not content:
                self.stdout.write(self.style.WARNING(f"Skipping blog due to missing title or content."))
                continue

            # Parse published date
            from email.utils import parsedate_to_datetime
            try:
                published_date = parsedate_to_datetime(published_date_raw)
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Failed to parse date for blog '{title}': {e}"))
                published_date = None

            # Extract images from content
            image_urls = re.findall(r'<img[^>]+src="([^"]+)"', content)
            updated_content = content

            for url in image_urls:
                try:
                    # Extract filename from URL
                    parsed_url = urlparse(url)
                    filename = os.path.basename(parsed_url.path)
                    filename = unquote(filename)  # Decode any URL-encoded parts
                    save_path = os.path.join(image_folder, filename)

                    # Check if the image already exists
                    if os.path.exists(save_path):
                        self.stdout.write(self.style.SUCCESS(f"Using existing image: {filename}"))
                    else:
                        # If not, download the image
                        import requests
                        response = requests.get(url, stream=True)
                        response.raise_for_status()
                        with open(save_path, "wb") as image_file:
                            for chunk in response.iter_content(1024):
                                image_file.write(chunk)
                        self.stdout.write(self.style.SUCCESS(f"Downloaded image: {filename}"))

                    # Update the content with the local image path
                    local_url = f"/static/images/project_images/{filename}"
                    updated_content = updated_content.replace(url, local_url)

                except Exception as e:
                    self.stdout.write(self.style.ERROR(f"Failed to process image {url}: {e}"))

            # Strip HTML tags for plain text content if needed
            plain_text = strip_tags(updated_content)

            try:
                # Save the blog
                blog = Blog.objects.create(
                    title=title,
                    content=updated_content,
                    published_date=published_date,
                )
                self.stdout.write(self.style.SUCCESS(f"Successfully imported blog '{title}'"))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Failed to import blog '{title}': {e}"))
