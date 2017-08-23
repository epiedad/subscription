# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('alert', '0003_auto_20170511_1458'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='channel',
            name='subscriptions',
        ),
        migrations.AddField(
            model_name='subscriber',
            name='subscriptions',
            field=models.ManyToManyField(to='alert.Channel', through='alert.Subscription'),
        ),
    ]
