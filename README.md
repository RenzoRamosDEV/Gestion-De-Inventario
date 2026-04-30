# 📦 Sistema de Gestión de Inventario

Sistema de gestión de inventario full-stack con backend en Spring Boot y frontend en React.

---

## Funcionalidades actuales

### Productos
- Crear, editar y eliminar productos (soft delete)
- Restaurar productos eliminados
- Listar con paginación (10 por página)
- Búsqueda por nombre en tiempo real (debounce 300ms)
- Filtrar por stock disponible y por estado (activo / eliminado / todos)

### Stock
- Aumentar stock manualmente
- Reducir stock (validación: no permite stock negativo)
- Auto-reactivación: si se aumenta el stock de un producto eliminado, se reactiva automáticamente

### Dashboard
- Tarjetas con métricas: total de productos, valor total en stock, productos con stock bajo, sin stock
- Gráfico de stock por mes
- Top productos por precio
- Distribución por rangos de precio
- Tabla de productos con stock bajo

### API REST
- Documentación Swagger disponible en `http://localhost:8080/api/v1/swagger-ui.html`
- Endpoints de monitoreo en `http://localhost:8080/api/v1/actuator`
- Manejo global de errores (400, 404, 500)

---

## Stack técnico

| Capa | Tecnología |
|------|-----------|
| Backend | Java 17 · Spring Boot 3.2 · Spring Data JPA |
| Base de datos | MySQL 8 |
| Frontend | React 18 · Vite 5 · TypeScript · Tailwind CSS 3 |
| Gráficas | Recharts |
| HTTP client | Axios |
| Documentación API | SpringDoc OpenAPI / Swagger |
| Contenedores | Docker · Docker Compose |

---

## Cómo levantar el proyecto

### Opción A — Docker Compose (recomendada)

Levanta MySQL y el backend con un solo comando.

```bash
cd entity-service
docker compose up -d
```

Luego levantar el frontend:

```bash
cd frontend
npm install
npm run dev
```

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:8080/api/v1 |
| Swagger | http://localhost:8080/api/v1/swagger-ui.html |
| Actuator | http://localhost:8080/api/v1/actuator |
| MySQL | localhost:3306 |

---

### Opción B — Local sin Docker

#### Requisitos previos
- Java 17+
- Maven 3.8+
- MySQL 8 corriendo en `localhost:3306`
- Node.js 18+

#### 1. Crear la base de datos

```sql
CREATE DATABASE IF NOT EXISTS inventario;
```

Ejecutar el script de datos de prueba (opcional):

```bash
mysql -u root -p inventario < entity-service/sql/insert_sample_data.sql
```

#### 2. Configurar variables de entorno

Crear `entity-service/.env` (o editar `application.properties`):

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=inventario
DB_USERNAME=root
DB_PASSWORD=admin
```

#### 3. Levantar el backend

```bash
cd entity-service
mvn spring-boot:run
```

#### 4. Levantar el frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Estructura del proyecto

```
inventario/
├── entity-service/          # Backend Spring Boot
│   ├── src/
│   │   ├── main/java/.../
│   │   │   ├── controller/  # Endpoints REST
│   │   │   ├── service/     # Lógica de negocio + DTOs
│   │   │   ├── repository/  # Interfaz de dominio + adapter JPA
│   │   │   ├── config/      # CORS, Swagger
│   │   │   └── exception/   # Manejo global de errores
│   │   └── resources/
│   │       └── application.properties
│   ├── sql/
│   │   ├── 01-schema.sql         # Esquema de la base de datos
│   │   └── insert_sample_data.sql # 52 productos de ejemplo
│   ├── Dockerfile
│   └── docker-compose.yml
│
└── frontend/                # Frontend React
    └── src/
        ├── api/             # Cliente Axios
        ├── components/      # Sidebar, modales, badges
        ├── pages/           # Dashboard, Inventario
        └── types/           # Tipos TypeScript
```

---

## API Reference

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/products` | Listar productos (paginado, con filtros) |
| GET | `/products/{id}` | Obtener producto por ID |
| POST | `/products` | Crear producto |
| PUT | `/products/{id}` | Actualizar producto |
| DELETE | `/products/{id}` | Eliminar producto (soft delete) |
| POST | `/products/{id}/restore` | Restaurar producto eliminado |
| POST | `/products/{id}/increase-stock` | Aumentar stock |
| POST | `/products/{id}/decrease-stock` | Reducir stock |

### Parámetros de filtro (`GET /products`)

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `name` | string | Búsqueda parcial por nombre |
| `minPrice` | decimal | Precio mínimo |
| `maxPrice` | decimal | Precio máximo |
| `inStock` | boolean | Solo productos con stock > 0 |
| `showDeleted` | boolean | Incluir productos eliminados |
| `page` | int | Número de página (empieza en 0) |
| `size` | int | Elementos por página |

---

## Screenshots

![Dashboard](docs/images/dashboard.png)
![Inventario](docs/images/inventory.png)

## Próximas funcionalidades

### Autenticación y usuarios
- Login con JWT
- Roles: administrador, operador, solo lectura
- Historial de acciones por usuario

### Categorías
- Asignar categorías a productos
- Filtrar inventario por categoría
- Gestión de categorías desde la interfaz

### Imágenes de productos
- Subida de imagen al backend
- Soporte para URL externa como alternativa
- Previsualización en tabla y modales

### Movimientos de stock
- Registro de cada entrada y salida de stock con fecha, cantidad y usuario
- Historial por producto
- Exportar movimientos a CSV o Excel

### Alertas de stock bajo
- Definir umbral mínimo por producto
- Notificación visual cuando el stock baja del umbral
- (Futuro) Notificación por email o sistema de alertas

### Proveedores
- Registrar proveedores con contacto
- Asociar productos a proveedores
- Órdenes de reabastecimiento

### Reportes avanzados
- Exportar inventario a PDF / Excel
- Reporte de productos más y menos vendidos
- Proyección de stock basada en historial

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - vea el archivo [LICENSE](LICENSE) para más detalles.

## Autor

**Renzo Ramos** - [GitHub](https://github.com/RenzoRamosDEV)

## Agradecimientos

- Spring Boot community
- React community
- Contributors y testers

---

⭐ ¡No olvides dar una estrella al proyecto si te fue útil!
