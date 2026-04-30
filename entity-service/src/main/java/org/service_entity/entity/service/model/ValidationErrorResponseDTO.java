package org.service_entity.entity.service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * DTO para respuesta de validación con errores múltiples.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ValidationErrorResponseDTO {
    
    private String message;
    private List<FieldError> fieldErrors;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FieldError {
        private String field;
        private String message;
        private Object rejectedValue;
    }
}