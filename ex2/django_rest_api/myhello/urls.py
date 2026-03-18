from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('myhello/add', views.add_post),
    path('myhello/list', views.list_post),
]