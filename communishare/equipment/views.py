from django.shortcuts import render, get_list_or_404
from django.http import HttpResponseRedirect, HttpResponse
from django.template import loader
from django.views import generic
from django.contrib import messages
from .models import Item
from django.urls import reverse
from .forms import ItemForm


class ItemListView(generic.ListView):
    model = Item
    template_name = 'equipment/item_list.html'


class ItemDetailView(generic.DetailView):
    model = Item
    template_name = 'equipment/item_detail.html'


def item_create(request):
    if request.method == 'POST':
        form = ItemForm(request.POST,files=request.FILES)
        if form.is_valid():
            item = Item(name=form.cleaned_data['name'], description=form.cleaned_data['description'],
                        availability=form.cleaned_data['availability'], condition=form.cleaned_data['condition'],
                        image=form.cleaned_data['image'])
            item.save()
            messages.success(request, 'Thank you for sharing an item %s' % form.cleaned_data['name'])
            return HttpResponseRedirect(reverse('equipment:item_list'))
    else:
        form = ItemForm()
    return render(request, 'equipment/shareItem.html', {'form': form})
