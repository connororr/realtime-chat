# Generated by Django 2.2.6 on 2019-10-13 07:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0019_auto_20191012_0540'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project_photos',
            name='image',
            field=models.ImageField(blank=True, upload_to=''),
        ),
    ]
