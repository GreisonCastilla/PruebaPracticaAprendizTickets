# Prueba práctica aprendíz tickets

Prueba técnica de desarrollo de software con django y nextjs
***
# Requisitos

- Python 3.12
- Node.js 22.12
- Docker
- Docker Compose
***
# Instalación

## Clonar el repositorio
La aplicacion se encuentra en el repositorio de github https://github.com/greison/PruebaPracticaAprendizTickets.git

```bash
$ git clone https://github.com/greison/PruebaPracticaAprendizTickets.git
$ cd PruebaPracticaAprendizTickets

```
## Local
para correr la aplicacion localmente sin necesidad de docker se debe ejecutar los siguientes comandos.

**Backend**
```bash
$ python -m venv venv
$ venv\Scripts\activate
$ pip install -r requirements.txt
$ python manage.py runserver
```

**Frontend**
```bash
$ cd frontend
$ npm install
$ npm run dev
```

## Docker
para correr la aplicacion localmente con docker se debe ejecutar el siguiente comando.
```bash
$ docker-compose up --build
```