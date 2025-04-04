# Generated by Django 4.2 on 2025-03-22 05:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('author', models.CharField(max_length=100)),
                ('genre', models.CharField(max_length=50)),
                ('description', models.TextField(blank=True, null=True)),
                ('purchase_link_india', models.URLField(blank=True, max_length=500, null=True)),
                ('purchase_link_international', models.URLField(blank=True, max_length=500, null=True)),
                ('cover_pic', models.ImageField(blank=True, null=True, upload_to='book_covers/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
