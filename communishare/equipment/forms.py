from django import forms
from .models import Item


class ItemForm(forms.ModelForm):
    # # # owner = forms.CharField(max_length=200, required=True)
    # name = forms.CharField(label='name', max_length=50, required=True)
    # condition = forms.CharField(max_length=50, widget=forms.Select)
    image1 = forms.ImageField(required=False)
    image2 = forms.ImageField(required=False)
    image3 = forms.ImageField(required=False)
    # availability = forms.BooleanField(label='Available')
    # description = forms.CharField(label='Description', widget=forms.Textarea)

    class Meta:
        model = Item
        fields = '__all__'
