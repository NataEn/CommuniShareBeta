import json
from datetime import datetime

from django.core.handlers.wsgi import WSGIRequest
from django.db.models import Q
from django.utils import timezone

from .constants import CATEGORIES
from .models import Item, ItemImage, ItemAvailability
from accounts.models import User
from django.http import JsonResponse, HttpResponseRedirect

AVAILABLE = 'available'
REQUESTED = 'requested'
BORROWED = 'borrowed'

from django.core.files.uploadedfile import UploadedFile
import logging


def items_dict(items):
    return [
        {
            'id': item.pk,
            'name': item.name,
            'condition': item.condition,
            'description': item.description,
            'images': [i.full_url for i in item.images.all()],
            'schedule': [(i.start_date, i.end_date) for i in item.schedule.all()]
        } for item in items
    ]


def get_items(request: WSGIRequest):
    items = Item.objects.all()
    return JsonResponse(items_dict(items), safe=False)


def get_last_10_items(request: WSGIRequest):
    items = Item.objects.order_by('created_at')[:10]
    return JsonResponse(items_dict(items), safe=False)


def post_item_schedual(request: WSGIRequest):
    item_id = request.POST['item']
    item = Item.objects.get(item=int(item_id))
    start_date = datetime.fromtimestamp(request.POST['start'])
    end_date = datetime.fromtimestamp(request.POST['end'])
    requester_id = request.POST['requester']
    requester = User.objects.get(item=int(requester_id))
    requested_status = (request.POST['status'], request.POST['status'])
    ItemAvailability.objects.update_or_create(item=item, start_date=start_date, end_date=end_date,
                                              status=requested_status,
                                              requester=requester)

    return JsonResponse({'msg': 'Schedual saved'}, safe=False)


def get_item_schedual(request: WSGIRequest):
    q = request.GET.get('q')
    item = Item.objects.get(pk=int(q))
    itemSchedual = item.schedule.all()
    start = request.GET.get('start')
    end = request.GET.get('end')
    item_schedule = [(i.start_date, i.end_date) for i in item.schedule.all()]


    for item_start, item_end in item_schedule:
        time_range = range(item_start, item_end)
        if start not in time_range and end not in time_range:
            # send notification to owner so he could grant permission to user and set the item unavailable
            return JsonResponse({'msg': 'OK'})
    return JsonResponse({'msg': 'NO'})


def post_item(request: WSGIRequest):
    uploadedimage1 = request.FILES.get('images1')
    uploadedimage2 = request.FILES.get('images2')
    dt = timezone.now()
    item = Item(created_at=dt, name=request.POST['name'], condition=request.POST['condition'],
                description=request.POST['description'], category=request.POST['category'], owner=request.user)
    item.save()
    if uploadedimage1:
        ItemImage.objects.update_or_create(item=item, img=uploadedimage1)
    if uploadedimage2:
        ItemImage.objects.update_or_create(item=item, img=uploadedimage2)

    return HttpResponseRedirect('/')


def get_single_item(request: WSGIRequest):
    q = request.GET.get('q')
    item = Item.objects.get(pk=int(q))
    item = {
        'id': item.pk,
        'name': item.name,
        'condition': item.condition,
        'description': item.description,
        'images': [i.full_url for i in item.images.all()],
        'schedule': [i.full_url for i in item.schedule.all()]
    }
    return JsonResponse(item, safe=False)


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
