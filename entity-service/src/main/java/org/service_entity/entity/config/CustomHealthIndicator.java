package org.service_entity.entity.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

/**
 * Health check personalizado para la aplicación.
 */
@Component
@Slf4j
public class CustomHealthIndicator implements HealthIndicator {

    @Override
    public Health health() {
        try {
            // Verificar que la aplicación está funcionando correctamente
            // Aquí podrías agregar más verificaciones como conectividad a base de datos, etc.
            
            return Health.up()
                    .withDetail("app", "Sistema de Inventario")
                    .withDetail("version", "1.0.0")
                    .withDetail("status", "Funcionando correctamente")
                    .build();
        } catch (Exception e) {
            log.error("Error en health check", e);
            return Health.down()
                    .withDetail("error", e.getMessage())
                    .build();
        }
    }
}