from django.db import models


class Entry(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)

    class Meta:
        verbose_name_plural = "Entries"
        ordering = ["name"]

    def __str__(self):
        return self.name


class Row(models.Model):
    level = models.CharField(null=False, blank=False,max_length=200) # counting from the bottom
    entry = models.ForeignKey("Entry", on_delete=models.CASCADE, null=False, related_name="rows")
    people = models.TextField(null=False, blank=False) # comma seperated, left-to-right from viewer's perspective

    class Meta:
        verbose_name_plural = "Rows"
        ordering = ["level"]

    def __str__(self):
        return "{} - Row {}".format(self.entry.name, self.level)
