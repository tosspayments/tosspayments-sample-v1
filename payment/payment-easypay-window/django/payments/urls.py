from django.urls import path
from . import views

urlpatterns = [
  path('', views.index),
  path('easypay', views.easypay),

  path('success', views.success),
  path('fail', views.fail),

]