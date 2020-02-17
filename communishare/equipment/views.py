from django.shortcuts import render, get_list_or_404
from django.http import HttpResponseRedirect
from django.utils import timezone
from django.contrib import messages
from .models import Item
from django.urls import reverse
from .forms import ItemForm

def item_list(request):
    note_list = get_list_or_404(Item)
    return render(request, 'item_list.html', {'item_list': note_list})


def item_create(request):
    if request.method == 'POST':
        form = ItemForm(request.POST)
        if form.is_valid():
            item = Item(name=form.cleaned_data['name'], description=form.cleaned_data['description'],availability=form.cleaned_data['availability'],condition=['condition'])
            item.save()
            messages.success(request, 'Thank you for sharing an item %s' % form.cleaned_data['name'])
            return HttpResponseRedirect(reverse('equipment:item_list'))
    else:
        form = ItemForm()
    return render(request, 'shareItem.html', {'form': form})
