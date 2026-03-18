from django.urls import path
from . import views

urlpatterns = [
    path('addcourse', views.add_course, name='add_course'),
    path('courselist', views.course_list, name='course_list'),
]