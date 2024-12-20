# blog/management/commands/import_blogs.py
import xml.etree.ElementTree as ET
from django.core.management.base import BaseCommand
from blog.models import Blog
from datetime import datetime

class Command(BaseCommand):
    help = 'Import blogs from a WordPress XML file'

    def add_arguments(self, parser):
        parser.add_argument('xml_file', type=str)

    def handle(self, *args, **kwargs):
        xml_file = kwargs['xml_file']
        tree = ET.parse(xml_file)
        root = tree.getroot()

        # Define the namespace if required
        namespaces = {
            'content': 'http://purl.org/rss/1.0/modules/content/',
            'dc': 'http://purl.org/dc/elements/1.1/'
        }

        # Loop through each item (blog post) in the XML
        for item in root.findall(".//item"):
            title = item.find('title').text if item.find('title') is not None else 'Untitled'
            content = item.find('content:encoded', namespaces).text if item.find('content:encoded', namespaces) is not None else 'No content available'
            author = item.find('dc:creator', namespaces).text if item.find('dc:creator', namespaces) is not None else 'Unknown'
            pub_date = item.find('pubDate').text

            # Convert pub_date to datetime object if possible
            try:
                published_date = datetime.strptime(pub_date, '%a, %d %b %Y %H:%M:%S %z') if pub_date else None
            except ValueError:
                published_date = None  # Handle invalid date formats

            # Ensure we only save blogs with a title
            if title and content:
                blog = Blog(
                    title=title,
                    content=content,
                    author=author,
                    published_date=published_date if published_date else datetime.now(),  # Use current date if missing
                )
                blog.save()

                self.stdout.write(self.style.SUCCESS(f'Successfully imported blog: {blog.title}'))
            else:
                self.stdout.write(self.style.WARNING(f'Skipping blog due to missing title or content.'))