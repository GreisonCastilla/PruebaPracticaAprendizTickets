# Prueba práctica aprendíz tickets

Prueba técnica de desarrollo de software Construir un demo funcional para registrar y gestionar tickets internos, usando Python, una base de datos SQL y un frontend web (HTML/CSS/JavaScript).
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
$ cd backend
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
cree el **.env** y dentro escriba: NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
Tenga en cuenta que la direccion es en la que corre el servidor, en caso de que el puerto sea diferente cambiarlo al que usted tenga.

## Docker
para correr la aplicacion localmente con docker se debe ejecutar el siguiente comando en la capeta principal del proyecto.
```bash
$ docker-compose up --build
```

## TEST
para correr los test se debe ejecutar el siguiente comando en la capeta principal del backend con la maquina viertual encendida.
```bash
$ python backend/manage.py test tickets
```
si se desea ver el resultado de cada test se debe ejecutar el siguiente comando en la capeta principal del backend con la maquina viertual encendida.
```bash
$ python backend/manage.py test tickets -v 2
```