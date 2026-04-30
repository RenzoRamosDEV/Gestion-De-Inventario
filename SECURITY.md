# Security Policy

## Versiones Soportadas

| Versión | Soportada          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reportar Vulnerabilidades

Si descubres una vulnerabilidad de seguridad en este proyecto, por favor repórtala responsablemente siguiendo estos pasos:

1. **NO** abras un issue público sobre la vulnerabilidad
2. Envía un email a: renzo.ramos.dev@gmail.com
3. Incluye una descripción detallada de la vulnerabilidad
4. Si es posible, proporciona pasos para reproducir el problema
5. Incluye información sobre el impacto potencial

## Qué esperar

- Confirmaremos la recepción de tu reporte dentro de 48 horas
- Evaluaremos la vulnerabilidad y determinaremos su severidad
- Te mantendremos informado del progreso
- Publicaremos una actualización de seguridad si es necesario
- Te daremos crédito por el descubrimiento (si lo deseas)

## Buenas prácticas de seguridad

- Nunca hardcodees credenciales en el código
- Utiliza variables de entorno para información sensible
- Mantén las dependencias actualizadas
- Implementa validación adecuada en todos los inputs
- Utiliza HTTPS en producción

## Configuración de seguridad recomendada

### Backend
- Configura CORS apropiadamente
- Implementa rate limiting
- Usa conexiones seguras a la base de datos
- Configura logs de seguridad

### Frontend  
- Evita almacenar información sensible en localStorage
- Valida todos los inputs del usuario
- Implementa CSP headers
- Mantén las dependencias actualizadas