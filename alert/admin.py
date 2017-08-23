from django.contrib import admin
from models import  Channel, Message, Subscriber, Subscription


class ChannelAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')

class MessageAdmin(admin.ModelAdmin):
    list_display = ('content', 'channel', 'created_at')

class SubscriptionInlineAdmin(admin.TabularInline):
    model = Subscription

class SubscriberAdmin(admin.ModelAdmin):
    list_display = ('username', 'mobile', 'email', 'slack_username', 'subscribed_to')
    inlines = (SubscriptionInlineAdmin,)


admin.site.register(Channel, ChannelAdmin)
admin.site.register(Message, MessageAdmin)
admin.site.register(Subscriber, SubscriberAdmin)
