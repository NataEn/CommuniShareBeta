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
from rest_framework import routers

from equipment.api import EquipmentViewSet, ShareEquipmentViewSet

equipment = ShareEquipmentViewSet.as_view({
    'get': 'retrieve',
    "post": 'add'
})

urlpatterns = [
    path("", include('frontend.urls')),
    # path('api/share-item/', equipment),
    # path("api/items", EquipmentViewSet),
    path("equipment/", include('equipment.urls')),
    path('admin/', admin.site.urls),
    path('', include('accounts.urls')),
    path('accounts/', include('django.contrib.auth.urls')),

]
