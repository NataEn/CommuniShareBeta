import json

from django.core.handlers.wsgi import WSGIRequest
from django.db.models import Q
from django.utils import timezone
from .models import Item, ItemImage
from django.http import JsonResponse
from django.core.files.uploadedfile import UploadedFile
import logging


def items_dict(items):
    return [
        {
            'name': item.name,
            'condition': item.condition,
            'description': item.description,
            'images': [i.full_url for i in item.images.all()],
        } for item in items
    ]


def get_items(request: WSGIRequest):
    items = Item.objects.all()
    return JsonResponse(items_dict(items), safe=False)


def get_last_10_items(request: WSGIRequest):
    items = Item.objects.order_by('created_at')[:10]
    return JsonResponse(items_dict(items), safe=False)


def post_item(request: WSGIRequest):
    CONDITION_CHOICES = ('New', 'Like new', 'Used', 'Functional')
    '''
   add try and catch, validation and so on...
    '''
    uploadedimage = request.FILES['images']
    print(request.FILES['images'].size)
    dt = timezone.now()
    item = Item(created_at=dt, name=request.POST['name'], condition=request.POST['condition'],
                description=request.POST['description'], category=request.POST['category'])
    item.save()
    image = ItemImage(item=item, img=uploadedimage)
    image.save()
    return JsonResponse({'msg': 'ok'})


def get_search_results(request: WSGIRequest):
    q = request.GET.get('q')
    if q == 'all':
        items = Item.objects.all()
    else:
        items = Item.objects.filter(
            Q(name__icontains=q) |
            Q(category__name__icontains=q) |
            Q(description__icontains=q) |
            Q(tags__name=q)
        )
    return JsonResponse(items_dict(items), safe=False)
