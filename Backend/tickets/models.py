from django.db import models

# Create your models here.

#clase ticket
class Ticket(models.Model):
    #se crear las tuplas para los valores aceptables para estados, prioridad y categoria
    STATES = [(1,'ENVIADO'), (2, 'EN REVISIÓN'), (3, 'CERRADO')]
    PRIORITY = [(1, 'MUY BAJA'),(2, 'BAJA'), (3, 'MODERADA'), (4, 'ALTA'),(5, 'MUY ALTA')]
    CATEGORIAS = [(1, 'SOPORTE'), (2, 'FACTURACION'), (3, 'VENTAS'), (4, 'RECLAMOS'), (5, 'CONSULTAS'), (6, 'TECNICO')]
    
    #se indican los atributos de la clase ticket
    id = models.AutoField(primary_key=True)
    title = models.TextField(null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    category = models.TextField(null=False, blank=False)
    priority = models.IntegerField(choices=PRIORITY, default=1)
    state = models.IntegerField(auto_created=True, choices=STATES, default=1)
    created_at =models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
#clase comentario
class Comentario(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.TextField(null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)