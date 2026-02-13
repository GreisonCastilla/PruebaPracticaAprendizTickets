from rest_framework import viewsets
from .models import Ticket
from .serializers import TicketSerializer
from .models import Comentario
from .serializers import ComentarioSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .serializers import MyTokenSerializer, UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend

class MyTokenView(TokenObtainPairView):
    serializer_class = MyTokenSerializer

class TicketsViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class =TicketSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['priority', 'state', 'category', 'created_by']
    
    #cambiar el estado del ticket
    @action(detail=True, methods=['post'])
    def changeState(self, request, pk=None):
        ticket = self.get_object()
        new_state = request.data.get('state')
        ticket.state = new_state
        ticket.save()
        return Response({'status':'state change'}, status = status.HTTP_200_OK)
    
    #cambiar la prioridad del ticket
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

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return super().get_permissions()