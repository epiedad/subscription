from django.conf.urls import include, url
from django.views.generic import TemplateView
from django.contrib.auth.views import (login, logout, logout_then_login)
from django.contrib.auth.decorators import login_required

urlpatterns = [
    url(r'^login/$', login, name='login'),
    url(r'^logout/$', logout , name='logout'),
    url(r'^logout-then-login/$', logout_then_login, name='logout_then_login'),

    url(r'^$', login_required(TemplateView.as_view(template_name='index.html')))
]
