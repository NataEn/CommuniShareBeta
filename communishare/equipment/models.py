from django.conf import settings
from django.db import models
from django.utils import timezone
from taggit.managers import TaggableManager

CONDITION_CHOICES = [
    ('New', 'New'),
    ('Like new', 'Like new'),
    ('Used', 'Used'),
    ('Functional', 'Functional'),
]


class ItemImage(models.Model):
    item = models.ForeignKey('equipment.Item', on_delete=models.CASCADE, related_name='images')
    img = models.ImageField(upload_to='img/', blank=True, unique=True)

    @property
    def full_url(self):
        if settings.DEBUG:
            return f'http://127.0.0.1:8000{self.img.url}'
        return self.img.url


class ItemCategory(models.Model):
    name = models.CharField(max_length=50)


class Item(models.Model):
    name = models.CharField(max_length=100)
    condition = models.CharField(max_length=20, choices=CONDITION_CHOICES)
    description = models.CharField(max_length=500, blank=True)
    availability = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    category = models.ForeignKey(ItemCategory, on_delete=models.SET_NULL, null=True, related_name='items')
    tags = TaggableManager()

    def __str__(self):
        return self.name
