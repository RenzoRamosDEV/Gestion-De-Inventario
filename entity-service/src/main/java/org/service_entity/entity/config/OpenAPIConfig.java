package org.service_entity.entity.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Configuración de OpenAPI/Swagger para la documentación de la API.
 * 
 * @author Sistema de Inventario
 * @version 1.0.0
 */
@Configuration
public class OpenAPIConfig {

    @Value("${app.version:1.0.0}")
    private String appVersion;

    @Value("${server.servlet.context-path:/api/v1}")
    private String contextPath;

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Sistema de Gestión de Inventario API")
                        .description("API REST para gestión de productos e inventario")
                        .version(appVersion)
                        .contact(new Contact()
                                .name("Equipo de Desarrollo")
                                .email("desarrollo@inventario.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080" + contextPath)
                                .description("Servidor de desarrollo"),
                        new Server()
                                .url("https://api.inventario.com" + contextPath)
                                .description("Servidor de producción")
                ));
    }
}