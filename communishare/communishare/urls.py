"""communishare URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-base
"""
from django.contrib import admin
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.conf.urls import url

from accounts.api import signed_user, signout
from accounts.views import signup
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from equipment.api import get_items, post_item, get_last_10_items, get_search_results

urlpatterns = [
    path("", include('frontend.urls')),
    path("api/all_items/", get_items),
    path("api/share_item/", csrf_exempt(post_item)),
    path('api/last_10/', get_last_10_items),
    path('api/search/', get_search_results),
    # path('api/share-item/', equipment),#this is a django form path
    # path("api/items", EquipmentViewSet),#this is a django form path
    path("equipment/", include('equipment.urls')),
    path('admin/', admin.site.urls),
    path('', include('accounts.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('accounts/current_user', csrf_exempt(signed_user)),
    path('accounts/signout', csrf_exempt(signout)),
    path('accounts/signup/', signup, name='signup'),

]
urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
