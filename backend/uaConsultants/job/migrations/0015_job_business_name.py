# Generated by Django 2.2.6 on 2019-10-10 23:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0014_remove_job_business_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='business_name',
            field=models.TextField(blank=True, max_length=500),
        ),
    ]
