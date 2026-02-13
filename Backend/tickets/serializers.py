from rest_framework import serializers
from .models import Ticket
from .models import Comentario

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields =('id', 'title', 'description', 'category', 'priority', 
        'state', 'created_at','updated_at')
        read_only_fields = ('id', 'created_at','updated_at')

class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = ('id','title', 'description', 'created_at')
        read_only_fields = ('id', 'updated_at')