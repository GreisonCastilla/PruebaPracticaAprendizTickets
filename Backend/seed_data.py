import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ticketsapi.settings')
django.setup()

from django.contrib.auth import get_user_model
from tickets.models import Ticket, Comentario
from django.utils import timezone

User = get_user_model()

def seed_data():
    print("Seeding data...")

    # 1. Create Users
    # Admin agent
    admin_user, created = User.objects.get_or_create(
        username='admin',
        defaults={
            'email': 'admin@example.com',
            'role': 'AGENT',
            'is_staff': True,
            'is_superuser': True
        }
    )
    if created:
        admin_user.set_password('admin')
        admin_user.save()
        print(f"Created admin user: {admin_user.username}")
    else:
        print(f"Admin user already exists: {admin_user.username}")

    # Petitioner user
    petitioner_user, created = User.objects.get_or_create(
        username='user',
        defaults={
            'email': 'user@example.com',
            'role': 'PETITIONER'
        }
    )
    if created:
        petitioner_user.set_password('password')
        petitioner_user.save()
        print(f"Created petitioner user: {petitioner_user.username}")
    else:
        print(f"Petitioner user already exists: {petitioner_user.username}")

    # 2. Create Tickets
    tickets_data = [
        {
            'title': 'No puedo acceder al sistema',
            'description': 'Al intentar entrar me sale un error de credenciales.',
            'category': 1,  # SOPORTE
            'priority': 4,  # ALTA
            'state': 1,     # ENVIADO
            'created_by': petitioner_user
        },
        {
            'title': 'Error en la factura de febrero',
            'description': 'El monto cobrado no coincide con mi plan.',
            'category': 2,  # FACTURACION
            'priority': 3,  # MODERADA
            'state': 2,     # EN REVISION
            'created_by': petitioner_user
        },
        {
            'title': 'Solicitud de nuevo equipo',
            'description': 'Necesito un monitor adicional para mi puesto de trabajo.',
            'category': 6,  # TECNICO
            'priority': 2,  # BAJA
            'state': 3,     # CERRADO
            'created_by': petitioner_user
        }
    ]

    for t_data in tickets_data:
        ticket, created = Ticket.objects.get_or_create(
            title=t_data['title'],
            defaults=t_data
        )
        if created:
            print(f"Created ticket: {ticket.title}")
            
            # Add a comment to the ticket
            Comentario.objects.create(
                ticket=ticket,
                title="Comentario inicial",
                description=f"Se ha registrado la solicitud: {ticket.title}."
            )
        else:
            print(f"Ticket already exists: {ticket.title}")

    print("Seeding completed successfully.")

if __name__ == '__main__':
    seed_data()
