from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=100)
    condition = models.CharField(max_length=50)
    image = models.ImageField(upload_to='uploads/%Y/%m/%d/', blank=True)
    additional_info = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
