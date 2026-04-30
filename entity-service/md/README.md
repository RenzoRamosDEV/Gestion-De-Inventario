# 📦 Inventario Básico — Especificación (Nivel Profesional)

## 🎯 Objetivo

Construir un sistema de inventario con gestión de productos y stock, aplicando buenas prácticas reales de backend (validaciones, transacciones, arquitectura limpia y escalabilidad).

---

## 🧱 1. Funcionalidades Mínimas

### 📌 Productos
- Crear producto
- Editar / actualizar producto
- Eliminar producto (soft delete)
- Listar productos con paginación

### 📄 Modelo Base
```json
{
  "id": 1,
  "name": "Teclado",
  "description": "Mecánico",
  "price": 50.0,
  "stock": 10,
  "createdAt": "...",
  "updatedAt": "..."
}
```

### 📌 Nota:
La imagen puede venir de:
- URL externa
- Archivo local (subida al backend)

### 📦 Stock
- Incrementar stock
- Reducir stock
- Prohibido stock negativo ❌

### 🔍 Búsqueda y Filtros
- Por nombre
- Por rango de precio
- Por stock disponible

---

## 🧠 2. Reglas de Negocio (OBLIGATORIAS)

- ❌ No permitir stock < 0
- ❌ No permitir productos sin nombre
- ❌ Precio no puede ser negativo
- ✔ Operaciones de stock deben ser atómicas (@Transactional)
- ✔ Validaciones siempre en backend

---

## 🏗️ 3. Arquitectura del Microservicio

```
entity-service/
├── pom.xml
├── Dockerfile
├── .env
│
├── sql/
│   └── insert_sample_data.sql
│
└── src/
    ├── main/java/org/service_entity/entity/
    │
    │   ├── EntityApplication.java
    │
    │   ├── controller/
    │   │   └── EntityController.java
    │
    │   ├── service/
    │   │   ├── EntityService.java
    │   │   ├── impl/
    │   │   │   └── EntityServiceImpl.java
    │   │   └── model/
    │   │       ├── EntityCreateDTO.java
    │   │       ├── EntityUpdateDTO.java
    │   │       ├── EntityResponseDTO.java
    │   │       └── EntityMapper.java
    │
    │   ├── repository/
    │   │   ├── EntityRepository.java
    │   │   ├── jpa/
    │   │   │   ├── EntityRepositoryJPA.java
    │   │   │   └── model/
    │   │   │       ├── JPAEntityModel.java
    │   │   │       └── JPAEntityMapper.java
    │   │   └── model/
    │   │       └── RepositoryEntityModel.java
    │
    │   ├── config/
    │   │   ├── CorsConfig.java
    │   │   └── OpenAPIConfig.java
    │
    │   ├── annotation/
    │   │   └── ApiResponsesAnnotations.java
    │
    └── resources/
        └── application.properties
```

---

## 🔌 4. API REST

### Productos
- `GET    /products`
- `GET    /products/{id}`
- `POST   /products`
- `PUT    /products/{id}`
- `DELETE /products/{id}`

### Stock
- `POST /products/{id}/increase-stock`
- `POST /products/{id}/decrease-stock`

### Request Stock
```json
{
  "quantity": 5
}
```

---

## 🧾 5. DTOs (OBLIGATORIO)

### ProductRequestDTO
```json
{
  "name": "Teclado",
  "description": "Mecánico",
  "price": 50.0
}
```

### ProductResponseDTO
```json
{
  "id": 1,
  "name": "Teclado",
  "price": 50.0,
  "stock": 10
}
```

---

## ⚠️ 6. Manejo de Errores

### Reglas
- Producto no encontrado → 404
- Datos inválidos → 400
- Error interno → 500

### Ejemplo Respuesta
```json
{
  "error": "Product not found",
  "status": 404
}
```

---

## 🗄️ 7. Base de Datos (MySQL)

### Nombre de la Base de Datos
`inventario`

### 🔌 Puertos
| Entorno            | Host Port | Container Port |
| ------------------ | --------- | -------------- |
| Local (sin Docker) | 3006      | 3006           |
| Docker             | 3007      | 3006           |

### 📌 Explicación Clara
- **MySQL fuera de Docker:** 👉 localhost:3006
- **MySQL dentro de Docker:** 👉 localhost:3007 → 3006 (container)

### 📊 Tabla: products
| Campo       | Tipo      |
| ----------- | --------- |
| id          | Long      |
| name        | String    |
| description | String    |
| price       | Decimal   |
| stock       | Integer   |
| deleted     | Boolean   |
| created_at  | Timestamp |

---

## ⚙️ 8. Buenas Prácticas

### Backend
- @Transactional en stock
- @Valid en DTOs
- Controller sin lógica
- Logs básicos

### Performance
- Paginación (Pageable)
- Índice en name

### Seguridad
- Sanitización de inputs
- No exponer entidades directamente

---

## 🧪 9. Tests Mínimos

- Crear producto
- Reducir stock válido
- Reducir stock sin stock suficiente
- Obtener producto por ID

---

## 🐳 10. Docker (Extra Recomendado)

### Servicios
| Servicio | Puerto |
| -------- | ------ |
| Frontend | 3000   |
| Backend  | 8080   |
| MySQL    | 3007   |

### Base de Datos Docker
- **DB:** inventario
- **Puerto externo:** 3007
- **Puerto interno:** 3006

---

## 🚀 11. Extras que Suben Nivel

- Swagger / OpenAPI
- README completo
- Docker Compose
- Logs estructurados

---

## ❌ Anti-patterns

- Usar entidades en API
- No validar inputs
- Stock negativo permitido
- Lógica en controller
- Sin transacciones

---

## 🧠 Resumen

**Este proyecto NO es un CRUD simple.**

### Demuestra:
- Arquitectura real
- Control de negocio
- Consistencia de datos
- Escalabilidad básica