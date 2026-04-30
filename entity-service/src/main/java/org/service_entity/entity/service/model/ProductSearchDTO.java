package org.service_entity.entity.service.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para buscar productos.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductSearchDTO {
    
    @Size(max = 100, message = "El término de búsqueda no debe exceder 100 caracteres")
    private String searchTerm;
    
    private Double minPrice;
    private Double maxPrice;
    private Boolean inStock;
    private Boolean includeDeleted;
    private String sortBy = "name";
    private String sortDirection = "ASC";
}