from django.urls import path
from . import views

urlpatterns = [
  path('', views.index),
  path('billing_approve', views.billing_approve),
  
]