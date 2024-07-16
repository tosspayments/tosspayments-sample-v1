from django.urls import path
from . import views

urlpatterns = [
  path('', views.index),
  path('billing_auth', views.billing_auth),
  
]