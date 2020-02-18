from django.db import models

CONDITION_CHOICES = [
    ('New','New'),
    ('Like new','Like new'),
    ('Used','Used'),
    ('Functional','Functional'),
]


class Item(models.Model):
    name = models.CharField(max_length=100)
    condition = models.CharField(max_length=20, choices=CONDITION_CHOICES)
    # image = models.ImageField(upload_to='uploads/%Y/%m/%d/', blank=True)
    description = models.CharField(max_length=500, blank=True)
    availability = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name
