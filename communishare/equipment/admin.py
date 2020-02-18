from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import Item, ItemImage


# Register your models here.

class ItemImageInline(admin.TabularInline):
    model = ItemImage
    extra = 1


class ItemAdmin(admin.ModelAdmin):
    list_display = ('img', 'name', 'condition')
    inlines = [ItemImageInline]

    def img(self, obj):
        img = obj.images.first()
        if img:
            return mark_safe(f'<img src="{img.img.url}">')
        return ''

    img.short_description = 'First image'


admin.site.register(Item, ItemAdmin)
admin.site.register(ItemImage)
