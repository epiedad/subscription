from django.apps import AppConfig


class SpotAlertAppConfig(AppConfig):
    name = 'alert'
    
    def ready(self):
        import signals
