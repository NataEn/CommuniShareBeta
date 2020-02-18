from django import forms
from .models import Item


class ItemForm(forms.ModelForm):
    # # # owner = forms.CharField(max_length=200, required=True)
    # name = forms.CharField(label='name', max_length=50, required=True)
    # condition = forms.CharField(max_length=50, widget=forms.Select)
    # image = forms.ImageField(allow_empty_file=True)
    # availability = forms.BooleanField(label='Available')
    # description = forms.CharField(label='Description', widget=forms.Textarea)

    class Meta:
        model = Item
        fields = '__all__'
