from django.db import models


class Entry(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)


class Row(models.Model):
    level = models.IntegerField(null=False, blank=False) # counting from the bottom
    entry = models.ForeignKey("Entry", on_delete=models.CASCADE, null=False)
    people = models.TextField(null=False, blank=False) # comma seperated, left-to-right from viewer's perspective
