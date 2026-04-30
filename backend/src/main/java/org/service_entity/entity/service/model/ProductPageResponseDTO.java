package org.service_entity.entity.service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * DTO para respuestas paginadas de productos.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductPageResponseDTO {
    
    private List<ProductResponseDTO> content;
    private int totalPages;
    private long totalElements;
    private int currentPage;
    private int pageSize;
    private boolean hasNext;
    private boolean hasPrevious;

    public static ProductPageResponseDTO from(Page<ProductResponseDTO> page) {
        return new ProductPageResponseDTO(
            page.getContent(),
            page.getTotalPages(),
            page.getTotalElements(),
            page.getNumber(),
            page.getSize(),
            page.hasNext(),
            page.hasPrevious()
        );
    }
}