import json
from django.utils import timezone
from .models import Item, ItemImage
from django.http import JsonResponse
from django.core.files.uploadedfile import UploadedFile
import logging


def yaniv_api(request):
    print(json.loads(request.body))
    items = Item.objects.all()
    return JsonResponse([
        {
            'name': item.name,
            'condition': item.condition,
            'description': item.description,
            'images': [i.full_url for i in item.images.all()],
        } for item in items
    ], safe=False)


def post(request):
    payload = json.loads(request.body)
    logging.warning(payload)
    CONDITION_CHOICES = ('New', 'Like new', 'Used', 'Functional')
    '''
    payload should be in the form of:
    {'name':name, 'condition':one of CONDITION_CHOICES,'description':'free text','image':'img path'}
    this will be imported to creating the items
    '''
    dt = timezone.now
    item = Item(created_at=dt, name='chair', condition='New', description='brown')
    item.save()
    image = ItemImage(item=item, img=UploadedFile(open('C:/Users/Natalie/Desktop/images/dog1.jpg', 'rb')))
    image.save()
