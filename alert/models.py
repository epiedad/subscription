from django.db import models


class Channel(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)

    def __unicode__(self):
        return self.name


class Subscription(models.Model):
    subscriber = models.ForeignKey('Subscriber')
    channel = models.ForeignKey(Channel)
    sms = models.BooleanField()
    email = models.BooleanField()
    slack = models.BooleanField()
    inapp = models.BooleanField()


class Subscriber(models.Model):
    username = models.CharField(max_length=100)
    mobile = models.CharField('Mobile Number', max_length=20, null=True, blank=True)
    email = models.EmailField(blank=True, null=True)
    slack_username = models.CharField(max_length=100, null=True, blank=True)
    subscriptions = models.ManyToManyField(Channel, through=Subscription)

    def __unicode__(self):
        return self.username

    @property
    def subscribed_to(self):
        return self.subscriptions.count()


class Message(models.Model):
    created_at = models.DateTimeField(auto_now=True)
    content = models.TextField()
    channel = models.ForeignKey(Channel)

    class Meta:
        ordering = ['-pk']

    def __unicode__(self):
        return self.content
