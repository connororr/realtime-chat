from django.contrib import admin
# Register your models here.
from .models import job, project_photos

class photosInline(admin.StackedInline):
    model = project_photos
    extra = 0
    min_num = 1

class jobAdmin(admin.ModelAdmin):
    inlines = [photosInline]

admin.site.register(job, jobAdmin)
#admin.site.register(project_photos)

