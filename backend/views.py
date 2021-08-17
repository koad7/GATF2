from django.shortcuts import render
from django.views.generic import View
from django.conf import settings 
from django.http import HttpResponse
import os
import logging
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from backend.get_airtable_data import airtable_func

def index(request):
    return render(request, "build/index.html")

class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    run build`).
    """

    def get(self, request):
            print (os.path.join(settings.REACT_APP_DIR, 'build', 'index.html'))
            try:
                with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                    return HttpResponse(f.read())
            except FileNotFoundError:
                logging.exception('Production build of app not found')
                return HttpResponse(
                    """
                    This URL is only used when you have built the production
                    version of the app. Visit http://localhost:3000/ instead, or
                    run `yarn run build` to test the production version.
                    """,
                    status=501,
                )



class AiratableView(APIView):
    def get(self, request, format=None):
        return Response({'data': airtable_func()})
