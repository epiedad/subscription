# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Channel',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('create_at', models.DateTimeField(auto_now=True)),
                ('content', models.TextField()),
                ('channel', models.ForeignKey(to='alert.Channel')),
            ],
        ),
        migrations.CreateModel(
            name='Subscriber',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('username', models.CharField(max_length=100)),
                ('sms', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Subscription',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('sms', models.BooleanField()),
                ('email', models.BooleanField()),
                ('slack', models.BooleanField()),
                ('inapp', models.BooleanField()),
                ('channel', models.ForeignKey(to='alert.Channel')),
                ('subscriber', models.ForeignKey(to='alert.Subscriber')),
            ],
        ),
        migrations.AddField(
            model_name='channel',
            name='subscriptions',
            field=models.ManyToManyField(to='alert.Subscriber', through='alert.Subscription'),
        ),
    ]
