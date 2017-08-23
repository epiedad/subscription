from django.conf.urls import include, url
from rest_framework import routers
from views import ChannelViewSet, MessageViewSet, SubscriberViewSet, UserViewSet, SubscriptionViewSet


router = routers.DefaultRouter()
router.register(r'channels', ChannelViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'subscribers', SubscriberViewSet)
router.register(r'users', UserViewSet)
router.register(r'subscriptions', SubscriptionViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
]
