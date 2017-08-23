# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('alert', '0004_auto_20170511_1502'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='message',
            options={'ordering': ['-pk']},
        ),
        migrations.AddField(
            model_name='subscriber',
            name='slack_username',
            field=models.CharField(max_length=100, null=True, blank=True),
        ),
    ]
