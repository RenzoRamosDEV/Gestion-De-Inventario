package org.service_entity.entity.repository.jpa;

import org.service_entity.entity.repository.jpa.model.JPAProductModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

/**
 * Repositorio JPA para operaciones de productos.
 */
@Repository
public interface ProductRepositoryJPA extends JpaRepository<JPAProductModel, Long> {

    boolean existsByNameAndDeletedFalse(String name);
    
    long countByDeleted(Boolean deleted);
    
    long countByStockEqualsAndDeleted(Integer stock, Boolean deleted);
    
    long countByStockLessThanAndDeleted(Integer stock, Boolean deleted);
    
    @Query("SELECT SUM(p.price * p.stock) FROM JPAProductModel p WHERE p.deleted = false")
    Double calculateTotalInventoryValue();
    
    @Query("""
        SELECT p FROM JPAProductModel p 
        WHERE (:name IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')))
        AND (:minPrice IS NULL OR p.price >= :minPrice)
        AND (:maxPrice IS NULL OR p.price <= :maxPrice)
        AND (:inStock IS NULL OR (p.stock > 0) = :inStock)
        AND (:showDeleted = true OR p.deleted = false)
        """)
    Page<JPAProductModel> findProductsWithFilters(
            @Param("name") String name,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("inStock") Boolean inStock,
            @Param("showDeleted") Boolean showDeleted,
            Pageable pageable
    );
}