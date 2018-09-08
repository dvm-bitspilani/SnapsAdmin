from django.urls import path
from application import views


app_name="application"
urlpatterns = [
    path('', views.index, name="index"),
    path('submit', views.submit, name="submit"),
    path('generate', views.generateExcelSheet, name="generateExcelSheet"),
    path('autocomplete', views.autocomplete, name="autocomplete"),
    path('get-entry', views.getEntry, name="getEntry")
]
