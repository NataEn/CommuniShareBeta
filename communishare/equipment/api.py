import json

from django.core.handlers.wsgi import WSGIRequest
from django.db.models import Q
from django.utils import timezone

from .constants import CATEGORIES
from .models import Item, ItemImage
from django.http import JsonResponse, HttpResponseRedirect
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
    uploadedimage = request.FILES['images']
    print(request.FILES['images'].size)
    dt = timezone.now()
    item = Item(created_at=dt, name=request.POST['name'], condition=request.POST['condition'],
                description=request.POST['description'], category=request.POST['category'])
    item.save()
    image = ItemImage(item=item, img=uploadedimage)
    image.save()
    return HttpResponseRedirect('/')


def get_search_results(request: WSGIRequest):
    print(request.GET)
    q = request.GET.get('q')
    ordering = request.GET.get('ordering')

    if q == 'all' or q == '':
        items = Item.objects.all()
    elif q == 'name':
        items = Item.objects.filter(
            Q(name__icontains=q)
        )
    elif q in CATEGORIES:
        items = Item.objects.filter(
            Q(category__icontains=q)
        )
    else:
        print(q)
        items = Item.objects.filter(
            Q(name__icontains=q) |
            Q(category__icontains=q) |
            Q(description__icontains=q) |
            Q(condition__icontains=q) |
            Q(tags__name__icontains=q)
        )
    if ordering == 'date':
        items = items.order_by('created_at')
    elif ordering == 'availability':
        items = Item.objects.filter(availability=True)
    return JsonResponse(items_dict(items), safe=False)
