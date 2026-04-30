package org.service_entity.entity.repository;

import org.service_entity.entity.repository.model.RepositoryProductModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.Optional;

public interface ProductRepository {

    RepositoryProductModel save(RepositoryProductModel product);

    Optional<RepositoryProductModel> findById(Long id);

    Page<RepositoryProductModel> findAll(
            Pageable pageable,
            String name,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Boolean inStock,
            Boolean showDeleted
    );

    void softDelete(Long id);

    boolean existsActiveById(Long id);
}
