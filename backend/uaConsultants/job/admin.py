from django.contrib import admin

# Register your models here.
from .models import job

class jobAdmin(admin.ModelAdmin):
    exclude = ('business_name',)
    list_display = ('job_name', 'job_description', 'date_created')
    
    def save_model(self, request, obj, form, change):
        if not change:
            obj.business_name = request.user
        obj.save()

admin.site.register(job, jobAdmin)

