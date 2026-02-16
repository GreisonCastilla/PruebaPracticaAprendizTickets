# Instrucciones de Despliegue (VPS: Gunicorn + Nginx)

Esta guía detalla los pasos para realizar un despliegue real de la aplicación (Backend Django + Frontend Next.js) en un VPS con Ubuntu/Debian.

## 1. Preparación del Servidor
Actualizar el sistema e instalar dependencias básicas:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3-pip python3-venv nginx git curl
# Instalar Node.js (v18+)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y node.js
```

## 2. Configuración del Backend (Django)
1. **Clonar e instalar**:
   ```bash
   git clone <URL_DEL_REPOSITORIO> /var/www/tickets-app
   cd /var/www/tickets-app/Backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   pip install gunicorn
   ```
2. **Base de Datos y Estáticos**:
   ```bash
   python manage.py migrate
   python manage.py collectstatic --noinput
   ```
3. **Servicio Gunicorn (systemd)**:
   Crea el archivo `/etc/systemd/system/gunicorn.service`:
   ```ini
   [Unit]
   Description=gunicorn daemon
   After=network.target

   [Service]
   User=www-data
   Group=www-data
   WorkingDirectory=/var/www/tickets-app/Backend
   ExecStart=/var/www/tickets-app/Backend/venv/bin/gunicorn \
             --access-logfile - \
             --workers 3 \
             --bind unix:/run/gunicorn.sock \
             ticketsapi.wsgi:application

   [Install]
   WantedBy=multi-user.target
   ```
   ```bash
   sudo systemctl start gunicorn
   sudo systemctl enable gunicorn
   ```

## 3. Configuración del Frontend (Next.js)
1. **Build**:
   ```bash
   cd /var/www/tickets-app/frontend
   npm install
   # Asegúrate de configurar .env antes del build
   npm run build
   ```
2. **Ejecución (PM2)**:
   ```bash
   sudo npm install -g pm2
   pm2 start npm --name "tickets-frontend" -- start
   pm2 save
   pm2 startup
   ```

## 4. Configuración de Nginx
Crea el archivo `/etc/nginx/sites-available/tickets`:
```nginx
server {
    listen 80;
    server_name tu_dominio.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # API Backend
    location /api/ {
        include proxy_params;
        proxy_pass http://unix:/run/gunicorn.sock;
    }

    # Django Admin
    location /admin/ {
        include proxy_params;
        proxy_pass http://unix:/run/gunicorn.sock;
    }

    # Archivos Estáticos Backend
    location /static/ {
        alias /var/www/tickets-app/Backend/staticfiles/;
    }
}
```
Activa el sitio: `sudo ln -s /etc/nginx/sites-available/tickets /etc/nginx/sites-enabled/` y reinicia: `sudo systemctl restart nginx`.

## Variables de Entorno Requeridas

### Backend (`Backend/.env`)
| Variable | Descripción | Valor Recomendado |
| :--- | :--- | :--- |
| `DEBUG` | Activa/Desactiva modo debug | `False` |
| `SECRET_KEY` | Clave secreta de Django | Una cadena larga y aleatoria |
| `ALLOWED_HOSTS` | Hosts permitidos | `tu_dominio.com,localhost` |

### Frontend (`frontend/.env`)
| Variable | Descripción | Valor |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_BACKEND_URL` | URL de la API | `http://tu_dominio.com` |

## Consideraciones Básicas de Seguridad
1. **Firewall (UFW)**: 
   ```bash
   sudo ufw allow 'Nginx Full'
   sudo ufw allow OpenSSH
   sudo ufw enable
   ```
2. **SSL (Certbot)**:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d tu_dominio.com
   ```
3. **DEBUG=False**: Nunca habilitar `DEBUG` en producción ya que expone información sensible.
4. **Permisos**: Asegúrate de que `www-data` tenga permisos sobre la carpeta de la aplicación y la base de datos sqlite.
