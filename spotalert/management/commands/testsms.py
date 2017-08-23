import boto3
# import requests
from datetime import datetime
from django.core.management.base import BaseCommand


class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        sns = boto3.client('sns')
        sns.publish(PhoneNumber='+639175750043', Message='shell test: {}'.format(datetime.now()))
        # url = 'https://pcz2vj8lxj.execute-api.ap-southeast-2.amazonaws.com/prod/send'
        # data = {'message': 'shell test: {}'.format(datetime.now()), 'numbers': ["+639175750043"]}
        # r = requests.post(url, json=data)
        # if not r.ok:
        #     raise Exception(r.content)
