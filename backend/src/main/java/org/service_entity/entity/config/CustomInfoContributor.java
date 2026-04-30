package org.service_entity.entity.config;

import org.springframework.boot.actuate.info.InfoContributor;
import org.springframework.boot.actuate.info.Info;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * Contribuidor personalizado de información para Actuator.
 */
@Component
public class CustomInfoContributor implements InfoContributor {

    @Override
    public void contribute(Info.Builder builder) {
        builder.withDetail("app", Map.of(
                "name", "Sistema de Gestión de Inventario",
                "version", "1.0.0",
                "description", "Sistema full-stack para gestión de productos e inventario"
        ));
        
        builder.withDetail("system", Map.of(
                "startup-time", LocalDateTime.now(),
                "java-version", System.getProperty("java.version"),
                "java-vendor", System.getProperty("java.vendor")
        ));
    }
}