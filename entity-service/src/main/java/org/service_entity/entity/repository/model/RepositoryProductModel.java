package org.service_entity.entity.repository.model;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RepositoryProductModel {

    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private Boolean deleted;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
