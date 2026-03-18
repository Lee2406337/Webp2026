from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Course_table


@api_view(['GET'])
def add_course(request):
    department = request.GET.get('Department', '')
    course_title = request.GET.get('CourseTitle', '')
    instructor = request.GET.get('Instructor', '')

    if department and course_title and instructor:
        new_course = Course_table()
        new_course.Department = department
        new_course.CourseTitle = course_title
        new_course.Instructor = instructor
        new_course.save()

        return Response(
            {"data": course_title + " insert!"},
            status=status.HTTP_200_OK
        )
    else:
        return Response(
            {"res": "parameter is missing"},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['GET'])
def course_list(request):
    courses = Course_table.objects.all().values()
    return JsonResponse(
        list(courses),
        safe=False,
        json_dumps_params={'ensure_ascii': False, 'indent': 4}
    )