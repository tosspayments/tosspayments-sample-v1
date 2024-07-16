from django.urls import path
from . import views

urlpatterns = [
  path('', views.index),
  path('window', views.window),
  path('billing_confirm', views.billing_confirm),

  path('fail', views.fail),
  
]