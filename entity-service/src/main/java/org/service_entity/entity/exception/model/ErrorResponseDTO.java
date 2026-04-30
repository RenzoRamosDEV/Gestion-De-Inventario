package org.service_entity.entity.exception.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorResponseDTO {
    private String error;
    private int status;
}
