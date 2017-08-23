import boto3, requests
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from alert.models import Message
from slackclient import SlackClient


@receiver(post_save, sender=Message)
def send_message(sender, instance, **kwargs):
    message = '{}: {}'.format(instance.channel.name, instance.channel.description)
    for s in instance.channel.subscriber_set.all():
        subscription = s.subscription_set.get(channel=instance.channel)
        if subscription.sms:
            sns = boto3.client('sns')
            sns.publish(PhoneNumber=s.mobile, Message=message)
            # url = 'https://pcz2vj8lxj.execute-api.ap-southeast-2.amazonaws.com/prod/send'
            # data = {'message': instance.content, 'numbers': []}
            # r = requests.post(url, json=data)
            # if not r.ok:
            #     raise Exception(r.content)
        if subscription.email:
            pass
        if subscription.slack:
            slack_token = "xoxp-4874341831-219148286566-222015998243-c71325deffe2eb83701424125da23fa7";
            sc = SlackClient(slack_token);
            sc.api_call("chat.postMessage",
                channel = '{}{}'.format('@', subscription.subscriber.slack_username),
                text = message,
                username = 'Spot Alert'
            )
        if subscription.inapp:
            headers = {'Authorization': 'Token 8e71ce2315bc41ae166e176c9a3a4a46f0591b8d'}
            user_id = get_user_id(s.username, headers)
            data = {'message': message, 'user': '{}/users/{}/'.format(settings.API_SPOT, user_id)}
            r = requests.post('{}/notifications/'.format(settings.API_SPOT), json=data, headers=headers)
            if not r.ok:
                raise Exception(r.content)

def get_user_id(username, headers):
    r = requests.get('{}/users/'.format(settings.API_SPOT), headers=headers)
    r = requests.get('{}/users/?limit={}'.format(settings.API_SPOT, r.json()['count']), headers=headers)
    if not r.ok:
        raise Exception(r.content)
    for user in r.json()['results']:
        if user['username'] == username:
            return user['id']    
