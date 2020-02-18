from django.db import models

CONDITION_CHOICES = [
    ('New', 'New'),
    ('Like new', 'Like new'),
    ('Used', 'Used'),
    ('Functional', 'Functional'),
]


class ItemImage(models.Model):
    item = models.ForeignKey('equipment.Item', on_delete=models.CASCADE, related_name='images')
    img = models.ImageField(upload_to='img/', blank=True, unique=True)


class Item(models.Model):
    name = models.CharField(max_length=100)
    condition = models.CharField(max_length=20, choices=CONDITION_CHOICES)
    description = models.CharField(max_length=500, blank=True)
    availability = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
