from django.shortcuts import render
from application.models import *


def index(request):
    return render(request, "application/index.html", {})


def generateExcelSheet(request):

    if request.method == "GET":
        context = {"entries": Entry.objects.all()}
        print(context)
        return render(request, "application/generation_form.html", context)
