from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from .models import Ticket, Comentario

User = get_user_model()

class TicketAPITests(APITestCase):
    def setUp(self):
        # Create a user for authentication
        self.user_data = {
            'username': 'testuser',
            'password': 'testpassword123',
            'email': 'test@example.com',
            'role': 'PETITIONER'
        }
        self.user = User.objects.create_user(**self.user_data)
        
        # Get JWT token
        login_url = reverse('token_obtain_pair')
        response = self.client.post(login_url, {
            'username': self.user_data['username'],
            'password': self.user_data['password']
        })
        self.token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

        # Create a sample ticket
        self.ticket_data = {
            'title': 'Test Ticket',
            'description': 'This is a test ticket',
            'category': 1,
            'priority': 1,
            'state': 1,
            'created_by': self.user
        }
        self.ticket = Ticket.objects.create(**self.ticket_data)

    def test_user_registration(self):
        url = reverse('user-list') # Standard DRF router name for UserViewSet
        data = {
            'username': 'newuser',
            'password': 'newpassword123',
            'email': 'new@example.com',
            'role': 'PETITIONER'
        }
        # AllowAny should let us create a user without auth
        self.client.credentials() 
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)

    def test_create_ticket(self):
        url = reverse('ticket-list')
        data = {
            'title': 'New Ticket',
            'description': 'Description of new ticket',
            'category': 1,
            'priority': 2,
            'state': 1,
            'created_by': self.user.id
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Ticket.objects.count(), 2)

    def test_list_tickets(self):
        url = reverse('ticket-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_retrieve_ticket(self):
        url = reverse('ticket-detail', args=[self.ticket.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.ticket.title)

    def test_update_ticket(self):
        url = reverse('ticket-detail', args=[self.ticket.id])
        data = {
            'title': 'Updated Ticket Title',
            'description': 'Updated description',
            'category': 2,
            'priority': 3,
            'state': 2,
            'created_by': self.user.id
        }
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.ticket.refresh_from_db()
        self.assertEqual(self.ticket.title, 'Updated Ticket Title')

    def test_delete_ticket(self):
        url = reverse('ticket-detail', args=[self.ticket.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Ticket.objects.count(), 0)

    def test_change_state_action(self):
        url = reverse('ticket-changeState', args=[self.ticket.id])
        data = {'state': 2}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.ticket.refresh_from_db()
        self.assertEqual(self.ticket.state, 2)

    def test_change_priority_action(self):
        url = reverse('ticket-changePriority', args=[self.ticket.id])
        data = {'priority': 4}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.ticket.refresh_from_db()
        self.assertEqual(self.ticket.priority, 4)

    def test_create_comment(self):
        url = reverse('comentario-list')
        data = {
            'ticket': self.ticket.id,
            'title': 'New Comment',
            'description': 'Comment description'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Comentario.objects.count(), 1)
