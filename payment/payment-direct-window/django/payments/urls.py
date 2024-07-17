from django.urls import path
from . import views

urlpatterns = [
  path('', views.index),
  path('direct', views.direct),
  
  path('success', views.success),
  path('fail', views.fail),

]