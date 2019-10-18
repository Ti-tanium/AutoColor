from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('check_style', views.checkStyle),
    path('extract_palettes', views.extractPalettes),
]
