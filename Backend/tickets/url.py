from rest_framework import routers
from .api import TicketsViewSet
from .api import ComentarioViewSet

router = routers.DefaultRouter()
router.register('api/tickets', TicketsViewSet, 'tickets')
router.register('api/comentarios',ComentarioViewSet, 'comentarios')

urlpatterns = router.urls