from rest_framework import routers
from .api import TicketsViewSet, ComentarioViewSet, UserViewSet

router = routers.DefaultRouter()
router.register('api/tickets', TicketsViewSet, 'tickets')
router.register('api/comentarios', ComentarioViewSet, 'comentario')
router.register('api/users', UserViewSet, 'users')

urlpatterns = router.urls