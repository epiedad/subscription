try:
    from settings import *
except ImportError:
    pass

DEBUG = True

ALLOWED_HOSTS = ('127.0.0.1',)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'spot-alert',
        'USER': 'root',
    }
}
INSTALLED_APPS += (
        # 'api',
    )

STATIC_URL = '/static/'
