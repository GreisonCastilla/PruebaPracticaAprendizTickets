from rest_framework import routers
from .api import TicketsViewSet

router = routers.DefaultRouter()
router.register('api/tickets', TicketsViewSet, 'tickets')

urlpatterns = router.urls