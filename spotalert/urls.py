from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    # Examples:
    # url(r'^$', 'spotalert.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^subscription/', include('subscription.urls', namespace='subscription')),

    url(r'^admin777/', include(admin.site.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^', include('alert.urls')),
]
