package org.service_entity.entity.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.service_entity.entity.exception.InsufficientStockException;
import org.service_entity.entity.exception.ProductNotFoundException;
import org.service_entity.entity.repository.ProductRepository;
import org.service_entity.entity.repository.model.RepositoryProductModel;
import org.service_entity.entity.service.ProductService;
import org.service_entity.entity.service.model.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repository;
    private final ProductMapper mapper;

    @Override
    public ProductResponseDTO create(ProductCreateDTO dto) {
        log.info("Creating product: {}", dto.getName());
        RepositoryProductModel model = mapper.toRepositoryModel(dto);
        return mapper.toResponseDTO(repository.save(model));
    }

    @Override
    public ProductResponseDTO findById(Long id) {
        return repository.findById(id)
                .map(mapper::toResponseDTO)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    @Override
    public Page<ProductResponseDTO> findAll(
            Pageable pageable, String name,
            BigDecimal minPrice, BigDecimal maxPrice, Boolean inStock, Boolean showDeleted) {
        return repository.findAll(pageable, name, minPrice, maxPrice, inStock, showDeleted)
                .map(mapper::toResponseDTO);
    }

    @Override
    public ProductResponseDTO update(Long id, ProductUpdateDTO dto) {
        log.info("Updating product: {}", id);
        RepositoryProductModel existing = repository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        mapper.updateFromDTO(dto, existing);
        return mapper.toResponseDTO(repository.save(existing));
    }

    @Override
    public void delete(Long id) {
        log.info("Deleting product: {}", id);
        if (!repository.existsActiveById(id)) {
            throw new ProductNotFoundException(id);
        }
        repository.softDelete(id);
    }

    @Override
    @Transactional
    public ProductResponseDTO restore(Long id) {
        log.info("Restoring product: {}", id);
        RepositoryProductModel product = repository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        product.setDeleted(false);
        return mapper.toResponseDTO(repository.save(product));
    }

    @Override
    @Transactional
    public ProductResponseDTO increaseStock(Long id, StockRequestDTO dto) {
        log.info("Increasing stock for product {}: +{}", id, dto.getQuantity());
        RepositoryProductModel product = repository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        product.setStock(product.getStock() + dto.getQuantity());
        if (Boolean.TRUE.equals(product.getDeleted())) {
            product.setDeleted(false);
            log.info("Product {} reactivated on stock increase", id);
        }
        return mapper.toResponseDTO(repository.save(product));
    }

    @Override
    @Transactional
    public ProductResponseDTO decreaseStock(Long id, StockRequestDTO dto) {
        log.info("Decreasing stock for product {}: -{}", id, dto.getQuantity());
        RepositoryProductModel product = repository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        if (product.getStock() < dto.getQuantity()) {
            throw new InsufficientStockException(id, product.getStock(), dto.getQuantity());
        }
        product.setStock(product.getStock() - dto.getQuantity());
        return mapper.toResponseDTO(repository.save(product));
    }
}
