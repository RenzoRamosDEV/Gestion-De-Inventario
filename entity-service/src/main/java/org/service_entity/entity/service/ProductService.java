package org.service_entity.entity.service;

import org.service_entity.entity.service.model.ProductCreateDTO;
import org.service_entity.entity.service.model.ProductResponseDTO;
import org.service_entity.entity.service.model.ProductUpdateDTO;
import org.service_entity.entity.service.model.StockRequestDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;

public interface ProductService {

    ProductResponseDTO create(ProductCreateDTO dto);

    ProductResponseDTO findById(Long id);

    Page<ProductResponseDTO> findAll(
            Pageable pageable,
            String name,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Boolean inStock,
            Boolean showDeleted
    );

    ProductResponseDTO update(Long id, ProductUpdateDTO dto);

    void delete(Long id);

    ProductResponseDTO restore(Long id);

    ProductResponseDTO increaseStock(Long id, StockRequestDTO dto);

    ProductResponseDTO decreaseStock(Long id, StockRequestDTO dto);
}
