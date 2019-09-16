from django.contrib import admin
from .models import *

admin.site.register(register)
admin.site.register(login)
admin.site.register(registerResponseSuccess)
admin.site.register(registerResponseFail)
admin.site.register(loginResponseSuccess)
admin.site.register(loginResponseFail)
admin.site.register(userBlock)
admin.site.register(responseSuccess)
admin.site.register(responseFail)
admin.site.register(conversationData)