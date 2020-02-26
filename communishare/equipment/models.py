from django.conf import settings
from django.core.serializers.json import DjangoJSONEncoder
from django.db import models
from django.utils import timezone
from taggit.managers import TaggableManager
from equipment.constants import CONDITION_CHOICES
from django.contrib.auth import get_user_model

User = get_user_model()

AVAILABLE = 'available'
REQUESTED = 'requested'
BORROWED = 'borrowed'


class ItemAvailability(models.Model):
    item = models.ForeignKey('equipment.Item', on_delete=models.CASCADE, related_name='schedule')
    start_date = models.DateTimeField(null=True)
    end_date = models.DateTimeField(null=True)
    requester = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    status = models.CharField(null=False, default=AVAILABLE, max_length=20, choices=[(AVAILABLE, AVAILABLE), (REQUESTED, REQUESTED), (BORROWED, BORROWED)])

    class Meta:
        unique_together = [['end_date', 'start_date', 'item']]


class ItemImage(models.Model):
    item = models.ForeignKey('equipment.Item', on_delete=models.CASCADE, related_name='images')
    img = models.ImageField(upload_to='img/', blank=True, unique=True)

    @property
    def full_url(self):
        if settings.DEBUG:
            return f'http://127.0.0.1:8000{self.img.url}'
        return self.img.url


class Item(models.Model):
    name = models.CharField(max_length=100)
    condition = models.CharField(max_length=20, choices=CONDITION_CHOICES)
    description = models.CharField(max_length=500, blank=True)
    availability = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='items')
    category = models.CharField(max_length=50, default='something')
    tags = TaggableManager(blank=True)

    def __str__(self):
        return self.name


class EncodeModelToJson(DjangoJSONEncoder):
    def default(self, o):
        if isinstance(o, Item):
            item = {}
            item['images'] = ['http://127.0.0.1:8000' + x.img.url for x in o.images.all()]
            item['category'] = o.category
            item['name'] = o.name
            item['description'] = o.description
            item['availability'] = o.availability
            item['tags'] = [x for x in o.tags.all()]
            return item
        else:
            return super().default(o)
