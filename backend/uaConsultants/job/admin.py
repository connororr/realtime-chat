from django.contrib import admin

# Register your models here.
from .models import job, project_photos

admin.site.register(job)
admin.site.register(project_photos)

