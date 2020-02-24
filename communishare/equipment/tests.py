from django.core.files.uploadedfile import UploadedFile
from django.test import TestCase
from .models import Item, ItemImage
from django.utils import timezone
import logging



class ModelInstancesTests(TestCase):
    def test_create_Item_instance(self):
        dt = timezone.now()
        item = Item(created_at=dt, name='chair', condition='New', description='brown')
        item.save()
        image = ItemImage(item=item, img=UploadedFile(open('C:/Users/Natalie/Desktop/images/dog1.jpg', 'rb')))
        image.save()

        self.assertIsInstance(item, Item)
        self.assertEqual(item.availability, True)
        self.assertEqual(item.created_at, dt)
        self.assertEqual(str(item), "chair")
        self.assertEqual(Item.objects.count(), 1)

        logging.warning('Tests passed')


