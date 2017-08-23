#!/usr/bin/env python
import os, sys, platform

if __name__ == "__main__":
    if platform.system() == 'Linux':
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "spotalert.settings_dev")
    else:
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "spotalert.settings_dev")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
