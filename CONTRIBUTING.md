# Inventario - Guía de Contribución

## Configuración del entorno de desarrollo

1. **Java Development Kit (JDK) 17+**
2. **Maven 3.8+**
3. **Node.js 18+**
4. **MySQL 8**
5. **Docker** (opcional)

## Estilo de código

### Backend (Java/Spring Boot)
- Seguir convenciones de Java (camelCase)
- Usar Lombok para reducir boilerplate
- Documentar APIs con OpenAPI/Swagger
- Tests unitarios con JUnit 5

### Frontend (React/TypeScript)
- Seguir convenciones de TypeScript
- Usar hooks de React
- Componentes funcionales preferentemente
- Styling con Tailwind CSS

## Proceso de contribución

1. Fork del repositorio
2. Crear rama feature/fix: `git checkout -b feature/nueva-funcionalidad`
3. Commits siguiendo Conventional Commits
4. Pull Request con descripción detallada

## Convención de commits

```
tipo(scope): descripción corta

Descripción detallada (opcional)

Closes #123
```

**Tipos:**
- feat: nueva funcionalidad
- fix: corrección de bugs
- docs: documentación
- style: formato, espacios
- refactor: refactorización de código
- test: agregar/actualizar tests
- build: cambios en build/dependencies
- ci: cambios en CI/CD