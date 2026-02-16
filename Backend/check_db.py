import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ticketsapi.settings')
django.setup()

from django.contrib.auth import get_user_model
from tickets.models import Ticket

User = get_user_model()

def check():
    with open("check_results.txt", "w", encoding="utf-8") as f:
        f.write("--- Database Verification ---\n")
        try:
            user_count = User.objects.count()
            f.write(f"Total Users: {user_count}\n")
            
            admin = User.objects.filter(username='admin').first()
            if admin:
                f.write(f"Admin found: {admin.username}, Role: {admin.role}, Is Superuser: {admin.is_superuser}\n")
            else:
                f.write("Admin NOT found\n")
            
            user = User.objects.filter(username='user').first()
            if user:
                f.write(f"Petitioner user found: {user.username}, Role: {user.role}\n")
            else:
                f.write("Petitioner user NOT found\n")
            
            ticket_count = Ticket.objects.count()
            f.write(f"Total Tickets: {ticket_count}\n")
            
            tickets = Ticket.objects.all()
            for t in tickets:
                f.write(f"Ticket: {t.title} (State: {t.get_state_display()}, Priority: {t.get_priority_display()})\n")
                
        except Exception as e:
            f.write(f"ERROR: {e}\n")

if __name__ == "__main__":
    check()
