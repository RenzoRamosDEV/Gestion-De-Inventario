package org.service_entity.entity.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.service_entity.entity.annotation.ApiResponsesAnnotations;
import org.service_entity.entity.service.ProductService;
import org.service_entity.entity.service.model.ProductCreateDTO;
import org.service_entity.entity.service.model.ProductResponseDTO;
import org.service_entity.entity.service.model.ProductUpdateDTO;
import org.service_entity.entity.service.model.StockRequestDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@Tag(name = "Products", description = "Product management and stock control")
public class ProductController {

    private final ProductService service;

    @GetMapping
    @Operation(summary = "List all products with filters and pagination")
    @ApiResponsesAnnotations
    public ResponseEntity<Page<ProductResponseDTO>> getAll(
            @PageableDefault(size = 10) Pageable pageable,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Boolean inStock,
            @RequestParam(required = false) Boolean showDeleted
    ) {
        return ResponseEntity.ok(service.findAll(pageable, name, minPrice, maxPrice, inStock, showDeleted));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a product by ID")
    @ApiResponsesAnnotations
    public ResponseEntity<ProductResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    @Operation(summary = "Create a new product")
    @ApiResponsesAnnotations
    public ResponseEntity<ProductResponseDTO> create(@Valid @RequestBody ProductCreateDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing product")
    @ApiResponsesAnnotations
    public ResponseEntity<ProductResponseDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody ProductUpdateDTO dto
    ) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Soft delete a product")
    @ApiResponsesAnnotations
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/restore")
    @Operation(summary = "Restore a soft-deleted product")
    @ApiResponsesAnnotations
    public ResponseEntity<ProductResponseDTO> restore(@PathVariable Long id) {
        return ResponseEntity.ok(service.restore(id));
    }

    @PostMapping("/{id}/increase-stock")
    @Operation(summary = "Increase product stock")
    @ApiResponsesAnnotations
    public ResponseEntity<ProductResponseDTO> increaseStock(
            @PathVariable Long id,
            @Valid @RequestBody StockRequestDTO dto
    ) {
        return ResponseEntity.ok(service.increaseStock(id, dto));
    }

    @PostMapping("/{id}/decrease-stock")
    @Operation(summary = "Decrease product stock")
    @ApiResponsesAnnotations
    public ResponseEntity<ProductResponseDTO> decreaseStock(
            @PathVariable Long id,
            @Valid @RequestBody StockRequestDTO dto
    ) {
        return ResponseEntity.ok(service.decreaseStock(id, dto));
    }
}
