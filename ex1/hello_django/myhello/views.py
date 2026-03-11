import logging

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

logger = logging.getLogger(__name__)


@api_view(['GET'])
def hello_api(request):
    name = request.GET.get('name')

    logger.debug(f"Received request, name={name}")

    if not name:
        logger.warning("parameter: name is None")
        return Response(
            {"res": "parameter: name is None"},
            status=status.HTTP_400_BAD_REQUEST
        )

    result = f"Hello{name}"
    logger.info(f"Return result: {result}")

    return Response(
        {"data": result},
        status=status.HTTP_200_OK
    )