# Generated by Django 5.1.4 on 2024-12-24 11:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0003_remove_book_publication_date_book_cover_pic_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='purchase_link',
        ),
        migrations.AddField(
            model_name='book',
            name='purchase_link_india',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='book',
            name='purchase_link_international',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
    ]
