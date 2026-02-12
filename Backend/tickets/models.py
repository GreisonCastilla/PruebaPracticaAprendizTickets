from django.db import models

# Create your models here.

class Ticket(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.TextField(null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    category = models.TextField(null=False, blank=False)
    priority = models.TextField(null=False, blank=False)
    state = models.TextField(null=False, blank=False)
    created_at =models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)