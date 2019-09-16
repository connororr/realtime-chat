# Generated by Django 2.2.5 on 2019-09-13 07:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('uaConsultants', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='conversationData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('business_id', models.CharField(max_length=50)),
                ('business_name', models.CharField(max_length=50)),
                ('business_picture', models.CharField(max_length=100)),
                ('job_link', models.CharField(max_length=50)),
                ('user_name', models.CharField(max_length=50)),
            ],
        ),
        migrations.DeleteModel(
            name='conversation',
        ),
    ]
