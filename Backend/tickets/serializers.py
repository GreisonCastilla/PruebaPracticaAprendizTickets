from rest_framework import serializers
from .models import Ticket
from .models import Comentario
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model

#para crear usuario
User = get_user_model()



class MyTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        return token

class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = '__all__'
        read_only_fields = ('id', 'updated_at')

class TicketSerializer(serializers.ModelSerializer):
    comentarios = ComentarioSerializer(many=True, read_only=True)
    class Meta:
        model = Ticket
        fields ='__all__'
        read_only_fields = ('id', 'created_at','updated_at')

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    tickets = TicketSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'role', 'tickets')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            role=validated_data['role']
        )
        return user
