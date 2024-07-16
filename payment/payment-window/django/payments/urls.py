from django.urls import path
from . import views

urlpatterns = [
  path('', views.index),
  path('window', views.window),

  path('success', views.success),
  path('fail', views.fail),

]