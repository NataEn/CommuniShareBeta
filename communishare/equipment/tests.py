from django.test import TestCase
from .models import Item, ItemImage
from django.utils import timezone
import logging
from django.db import models

CONDITION_CHOICES = [
    ('New', 'New'),
    ('Like new', 'Like new'),
    ('Used', 'Used'),
    ('Functional', 'Functional'),
]


class ModelInstancesTests(TestCase):
    def test_create_Item_instance(self):
        image=ItemImage(image=r'C:\Users\Natalie\Desktop\images\dog1.jpg')
        item = Item(name='chair', condition='New', image=image,description='brown')
        # availability = models.BooleanField(default=True)
        # created_at = models.DateTimeField(auto_now_add=True)
        item.save()

        self.assertIsInstance(item, Item)
        self.assertEqual(item.availability, True)
        self.assertEqual(item.created_at, timezone.now())
        self.assertEqual(str(item), "chair")
        self.assertEqual(Item.objects.count(), 1)

        logging.warning('OK')


# Create your tests here.
