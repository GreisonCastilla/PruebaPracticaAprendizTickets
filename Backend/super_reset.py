import os
import django
import sys
import traceback

# Configuration
LOG_FILE = "execution_log.txt"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'data', 'db.sqlite3')

def log(message):
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(message + "\n")
    print(message)

def run_process():
    if os.path.exists(LOG_FILE):
        os.remove(LOG_FILE)
    
    log("--- Starting Super Reset ---")
    
    # 1. Delete Database
    if os.path.exists(DB_PATH):
        try:
            os.remove(DB_PATH)
            log("SUCCESS: Database deleted.")
        except Exception as e:
            log(f"ERROR deleting database: {e}")
            log(traceback.format_exc())
    else:
        log("INFO: Database file not found, skipping deletion.")

    # 2. Setup Django
    try:
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ticketsapi.settings')
        django.setup()
        log("SUCCESS: Django setup completed.")
    except Exception as e:
        log(f"ERROR setup Django: {e}")
        log(traceback.format_exc())
        return

    # 3. Run Migrations
    from django.core.management import call_command
    try:
        log("Running migrations...")
        call_command('migrate', interactive=False)
        log("SUCCESS: Migrations applied.")
    except Exception as e:
        log(f"ERROR running migrations: {e}")
        log(traceback.format_exc())

    # 4. Seed Data
    try:
        log("Seeding data...")
        from django.contrib.auth import get_user_model
        from tickets.models import Ticket, Comentario
        
        User = get_user_model()
        
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
            log(f"SUCCESS: Created admin user: {admin_user.username}")
        else:
            log(f"INFO: Admin user already exists: {admin_user.username}")

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
            log(f"SUCCESS: Created petitioner user: {petitioner_user.username}")
        else:
            log(f"INFO: Petitioner user already exists: {petitioner_user.username}")

        # Create Tickets
        tickets_data = [
            {'title': 'No puedo acceder al sistema', 'description': 'Error de credenciales.', 'category': 1, 'priority': 4, 'state': 1, 'created_by': petitioner_user},
            {'title': 'Error en la factura de febrero', 'description': 'Monto incorrecto.', 'category': 2, 'priority': 3, 'state': 2, 'created_by': petitioner_user},
            {'title': 'Solicitud de nuevo equipo', 'description': 'Monitor adicional.', 'category': 6, 'priority': 2, 'state': 3, 'created_by': petitioner_user}
        ]

        for t_data in tickets_data:
            ticket, created = Ticket.objects.get_or_create(title=t_data['title'], defaults=t_data)
            if created:
                log(f"SUCCESS: Created ticket: {ticket.title}")
                Comentario.objects.create(ticket=ticket, title="Comentario inicial", description=f"Registro: {ticket.title}.")
            else:
                log(f"INFO: Ticket already exists: {ticket.title}")

        log("--- Finished Seeding Successfully ---")
        
    except Exception as e:
        log(f"ERROR seeding data: {e}")
        log(traceback.format_exc())

if __name__ == "__main__":
    run_process()
