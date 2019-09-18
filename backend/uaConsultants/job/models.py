from django.db import models


class Job(models.Model):
    job_summary = models.CharField(max_length=50)
