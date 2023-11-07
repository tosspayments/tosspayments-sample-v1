from django.urls import path
from . import views

urlpatterns = [
    path('', views.checkout),
    path('success', views.success),
    path('fail', views.fail),
]

