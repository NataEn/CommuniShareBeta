from django.urls import path, re_path
from . import views

urlpatterns = [
    path("", views.index, name='home'),
    # path("<route:path>", views.index, name='home'),
]
