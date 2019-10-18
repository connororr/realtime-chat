from django.contrib import admin

# Register your models here.
from .models import Conversation, Message

class MessagesInLine(admin.StackedInline):
    model = Message
    extra = 0
    min_num = 1

class chatAdmin(admin.ModelAdmin):
    inlines = [MessagesInLine]

admin.site.register(Conversation, chatAdmin)