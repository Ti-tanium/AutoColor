import base64
import io

from django.shortcuts import render
from django.http import HttpResponse, StreamingHttpResponse
import numpy as np

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from . import stylePredict
from . import extractColor


def index(request):
    return HttpResponse("<h1>AutoColor</h1>Please see the reference document for more details.")


@api_view(['POST'])
def extractPalettes(request):
    EXT_NUM = 10
    try:
        img64 = request.data['pic']
        img = base64.b64decode(img64)
        imageBytes = io.BytesIO(img)
        colors = extractColor.get_palette(imageBytes, EXT_NUM)  # 尝试提取EXT_NUM个颜色
        colors = np.array(colors)
        palettes = []

        for i in range(20):
            idx = np.random.choice(len(colors), 5)  # n选5  n最大为EXT_NUM
            palette = sorted(colors[idx], key=extractColor.sortByLight2, reverse=True)
            palette = np.array(palette)
            palettes.append(palette.flatten())

    except Exception as e:
        print(e)
        return Response(data=str(e), status=status.HTTP_400_BAD_REQUEST)
    return Response(data={"palettes": palettes})


@api_view(['POST'])
def checkStyle(request):
    style = request.data['style']
    assert style in stylePredict.style
    palettes = np.array(request.data['palettes'])
    assert palettes.shape[1] == 15

    p = stylePredict.style_predict(palettes, style)

    print(p)
    return Response(data={"palette": p})




# def download_model(request):
#
#     def file_iterator(f, chunk_size=512):
#         while True:
#             c = f.read(chunk_size)
#             if c:
#                 yield c
#             else:
#                 break
#
#     the_file_name = "output.csv"
#     response = StreamingHttpResponse(file_iterator(file))
#     response['Content-Type'] = 'application/octet-stream'
#     response['Content-Disposition'] = 'attachment;filename="{0}"'.format(the_file_name)
#
#     return response
