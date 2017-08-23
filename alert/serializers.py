from rest_framework import serializers
from models import Channel, Message, Subscriber, Subscription
from django.contrib.auth import get_user_model                                                                         
User = get_user_model() 


class ChannelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Channel
        fields = ('id', 'name', 'description')


class MessageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Message
        fields = ('id', 'content', 'created_at', 'channel')


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ('id', 'subscriber', 'channel', 'sms', 'email', 'slack', 'inapp')

class SubscriberSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Subscriber
        fields = ('id', 'username', 'mobile', 'email', 'slack_username', 'subscriptions')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')
