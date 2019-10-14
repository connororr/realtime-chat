# Generated by Django 2.2.5 on 2019-10-10 01:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0011_auto_20191010_0154'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='job',
            name='project_photos',
        ),
        migrations.AddField(
            model_name='project_photos',
            name='project',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.PROTECT, related_name='project_photos', to='job.job'),
            preserve_default=False,
        ),
    ]
