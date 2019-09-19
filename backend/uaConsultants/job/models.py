from djongo import models


class JobPhoto(models.Model):
    image = models.CharField(max_length=300)
    title = models.CharField(max_length=50)

class Job(models.Model):
    job_name = models.CharField(max_length=50)
    date_created = models.IntegerField()
    job_summary = models.CharField(max_length=50)
    business_id = models.CharField(max_length=50)
    current_bid = models.IntegerField()
    project_photos = models.ArrayModelField(
        model_container = JobPhoto
    )
