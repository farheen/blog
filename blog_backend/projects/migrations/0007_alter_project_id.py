# Generated by Django 5.1.4 on 2024-12-10 06:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0006_alter_project_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
    ]
