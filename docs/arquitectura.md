# Decisiones

las decisiones se tomaron en base a la facilidad de desarrollo en poco tiempo, por este motivo se eligio django y nextjs.

## Backend

Se eligio django por su facilidad de desarrollo (gracias a que practicamente se puede realizar un crud completo con solo definir el modelo) y su gran cantidad de librerias que facilitan el desarrollo de funcionalidades complejas como la autenticacion, ademas de su documentacion y comunidad.

## Frontend

Se eligio nextjs por el conocimiento que tengo de este framework e igualmente por su facilidad de desarrollo y su gran cantidad de librerias, que contienen componentes que se pueden usar rapidamente.

## Base de datos

Se eligio sqlite por su facilidad de uso y por el contexto de la prueba, que no requiere una base de datos compleja, ademas de que se puede usar docker para facilitar su despliegue.

# Diagramas
## Diagrama de clases

```mermaid
classDiagram
    class User {
        +str username
        +str email
        +str password
    }
    class Ticket {
        +str title
        +str description
        +str status
        +str priority
        +str category
        +str assigned_to
        +str created_by
        +str created_at
        +str updated_at
    }
    class comment{
        +str title
        +str description
        +str created_by
        +str created_at
        +str updated_at
    }
    User "1" -- "*" Ticket : created_by
    Ticket "1" -- "*" comment : created_by
```
## Diagrama de despliegue

```mermaid
flowchart TD
    A[Frontend] --> B[Backend]
    B --> C[Base de datos]
```
## diagrema de secuencia para la creacion de un ticket
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Base de datos
    User->>Frontend: Crear ticket
    Frontend->>Backend: Crear ticket
    Backend->>Base de datos: Crear ticket
    Base de datos-->>Backend: Ticket creado
    Backend-->>Frontend: Ticket creado
    Frontend-->>User: Ticket creado
``` 