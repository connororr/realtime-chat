# Generated by Django 2.2.5 on 2019-10-08 21:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('job', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='job',
            name='business_id',
        ),
        migrations.AddField(
            model_name='job',
            name='business',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
    ]
