from django.urls import path
from . import views

urlpatterns = [
    path('', views.contact_form, name='contact-form'),
    path('shop-request/', views.shop_request, name='shop-request'),
]
