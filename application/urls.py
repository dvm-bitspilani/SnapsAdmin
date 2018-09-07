from django.urls import path
from application import views


app_name="application"
urlpatterns = [
    path('', views.index, name="index"),
    path('generate', views.generateExcelSheet, name="generateExcelSheet")
]
