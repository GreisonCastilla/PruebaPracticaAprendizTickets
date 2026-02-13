
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import TicketsViewSet, ComentarioViewSet, UserViewSet

router = DefaultRouter()
router.register(r'tickets', TicketsViewSet)
router.register(r'comentarios', ComentarioViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]