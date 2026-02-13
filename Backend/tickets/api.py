from rest_framework import viewsets
from .models import Ticket
from .serializers import TicketSerializer
from .models import Comentario
from .serializers import ComentarioSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

class TicketsViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class =TicketSerializer
    
    @action(detail=True, methods=['post'])
    def changeState(self, request, pk=None):
        ticket = self.get_object()
        new_state = request.data.get('state')
        ticket.state = new_state
        ticket.save()
        return Response({'status':'state change'}, status = status.HTTP_200_OK)
    
    @action(detail=True, methods=['post'])
    def changePriority(self, request, pk=None):
        ticket = self.get_object()
        new_priority = request.data.get('priority')
        ticket.priority = new_priority
        ticket.save()
        return Response({'status':'priority change'}, status = status.HTTP_200_OK)
    
class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer