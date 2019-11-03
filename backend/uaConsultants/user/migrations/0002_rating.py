# Generated by Django 2.2.5 on 2019-11-03 05:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.IntegerField()),
                ('being_rated', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='being_rated', to=settings.AUTH_USER_MODEL)),
                ('rater', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='rater', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
