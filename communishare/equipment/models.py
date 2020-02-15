from django.db import models


class Communi_User(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=100, unique=True)
    motto = models.CharField(max_length=100, blank=True)
    created_at=models.DateTimeField(auto_now_add=True)


class Item(models.Model):
    name = models.CharField(max_length=100)
    condition = models.CharField(max_length=50)
    additional_info = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
