from django.urls import  re_path, path
from backend.views import FrontendAppView
from backend.views import AiratableView

urlpatterns = [
    path('api/', AiratableView.as_view(), name='airtable-view'),
    re_path('', FrontendAppView.as_view(),name='home'),
]

