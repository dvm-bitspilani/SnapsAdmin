from django.contrib import admin
from .models import *


class RowInlines(admin.TabularInline):
    model = Row
    extra = 1


class EntryAdmin(admin.ModelAdmin):
    inlines = [RowInlines]


admin.site.register(Entry, EntryAdmin)
