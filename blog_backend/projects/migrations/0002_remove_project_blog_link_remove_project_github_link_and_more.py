# Generated by Django 5.1.4 on 2024-12-07 08:46

import markdownx.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='blog_link',
        ),
        migrations.RemoveField(
            model_name='project',
            name='github_link',
        ),
        migrations.RemoveField(
            model_name='project',
            name='image',
        ),
        migrations.RemoveField(
            model_name='project',
            name='live_demo',
        ),
        migrations.RemoveField(
            model_name='project',
            name='technologies_used',
        ),
        migrations.AddField(
            model_name='project',
            name='blog_url',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='code_url',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='project',
            name='description',
            field=markdownx.models.MarkdownxField(),
        ),
        migrations.AlterField(
            model_name='project',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]