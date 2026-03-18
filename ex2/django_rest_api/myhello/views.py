from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
import logging

from .models import Post

logger = logging.getLogger('django')

@api_view(['GET'])
def add_post(request):
    title = request.GET.get('title', '')
    content = request.GET.get('content', '')
    photo = request.GET.get('photo', '')
    location = request.GET.get('location', '')

    new_post = Post()
    new_post.title = title
    new_post.content = content
    new_post.photo = photo
    new_post.location = location
    new_post.save()

    logger.debug('************ myhello: ' + title)

    if title:
        return Response(
            {"data": title + " insert!"},
            status=status.HTTP_200_OK
        )
    else:
        return Response(
            {"res": "parameter: title is None"},
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['GET'])
def list_post(request):
    posts = Post.objects.all().values()
    return JsonResponse(list(posts), safe=False)