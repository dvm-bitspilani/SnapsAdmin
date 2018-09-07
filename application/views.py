from tempfile import NamedTemporaryFile

from django.http import HttpResponse
from django.shortcuts import render

from openpyxl import Workbook

from application.models import *


def index(request):
    return render(request, "application/index.html", {})


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
