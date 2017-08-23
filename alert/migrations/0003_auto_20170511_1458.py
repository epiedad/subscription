# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('alert', '0002_auto_20170511_1454'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='subscriber',
            name='sms',
        ),
        migrations.AddField(
            model_name='subscriber',
            name='email',
            field=models.EmailField(max_length=254, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='subscriber',
            name='mobile',
            field=models.CharField(max_length=20, null=True, verbose_name=b'Mobile Number', blank=True),
        ),
    ]
