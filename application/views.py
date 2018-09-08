import json
from tempfile import NamedTemporaryFile

from django.http import HttpResponse,JsonResponse
from django.shortcuts import render, redirect

from openpyxl import Workbook
from django.contrib import messages
from application.models import *
from django.views.decorators.csrf import csrf_exempt

def index(request):

    if request.method == "GET":
        return render(request, "application/index.html", {})

            

@csrf_exempt
def generateExcelSheet(request):

    if request.method == "GET":
        context = {"entries": Entry.objects.all()}
        print(context)
        return render(request, "application/generation_form.html", context)

    if request.method == "POST":
        entry = Entry.objects.get(id=request.POST["entry"])

        wb = Workbook()
        ws = wb.active

        ws["A1"] = "Row #"
        ws["B1"] = "People"

        ws.column_dimensions["B"].width = 200

        for i, row in enumerate(entry.rows.all(), start=2):
            ws["A{}".format(i)] = "Row {}".format(row.level)
            ws["B{}".format(i)] = row.people

        # after generation
        with NamedTemporaryFile() as tmp:
            wb.save(tmp.name)
            tmp.seek(0)
            stream = tmp.read()
            response = HttpResponse(stream, content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
            response['Content-Disposition'] = "attachment; filename={}".format(entry.name)
            return response
@csrf_exempt
def submit(request):
    if request.method == "POST":
        # passing JSON data would probably be a good idea, in which case:
        data = json.loads(request.body.decode('utf-8'))
        try:
            entry = Entry.objects.get_or_create(name=data["entry"])[0]
        except:
            response=JsonResponse({'message':'Department exists'})
            return response
        print(data)
        for row in data["rows"]:
            row_to_add = Row.objects.get_or_create(level=row["level"], entry=entry)[0]
            row_to_add.people = row["people"]
            row_to_add.save()
        entry.save()
        messages.success(request,'Enteries added')
        return JsonResponse({'message':'Done'})
        #return redirect(request.META.get('HTTP_REFERER'))
