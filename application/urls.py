from django.urls import path
from application import views


app_name="applications"
urlpatterns = [
    path('', views.index, name="index"),
]
