package org.service_entity.entity.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.service_entity.entity.exception.BusinessValidationException;
import org.service_entity.entity.exception.InsufficientStockException;
import org.service_entity.entity.exception.ProductNotFoundException;
import org.service_entity.entity.repository.ProductRepository;
import org.service_entity.entity.repository.model.RepositoryProductModel;
import org.service_entity.entity.service.ProductService;
import org.service_entity.entity.service.model.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public Page<ProductResponseDTO> getAllProducts(int page, int size, String name, 
            Double minPrice, Double maxPrice, Boolean inStock, Boolean showDeleted) {
        
        log.info("Obteniendo productos - página: {}, tamaño: {}", page, size);
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("name"));
        Page<RepositoryProductModel> products = productRepository.findProducts(
                pageable, name, minPrice, maxPrice, inStock, showDeleted);
        
        return products.map(ProductMapper::toResponseDTO);
    }

    @Override
    public ProductResponseDTO getProductById(Long id) {
        log.info("Obteniendo producto con ID: {}", id);
        
        RepositoryProductModel product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Producto no encontrado con ID: " + id));
        
        return ProductMapper.toResponseDTO(product);
    }

    @Override
    @Transactional
    public ProductResponseDTO createProduct(ProductCreateDTO productCreateDTO) {
        log.info("Creando nuevo producto: {}", productCreateDTO.getName());
        
        // Validar que el nombre no esté duplicado
        if (productRepository.existsByNameAndDeletedFalse(productCreateDTO.getName())) {
            throw new BusinessValidationException("Ya existe un producto activo con el nombre: " + productCreateDTO.getName());
        }
        
        RepositoryProductModel product = ProductMapper.toRepositoryModel(productCreateDTO);
        product.setStock(productCreateDTO.getInitialStock() != null ? productCreateDTO.getInitialStock() : 0);
        product.setDeleted(false);
        
        RepositoryProductModel savedProduct = productRepository.save(product);
        
        log.info("Producto creado exitosamente con ID: {}", savedProduct.getId());
        return ProductMapper.toResponseDTO(savedProduct);
    }

    @Override
    @Transactional
    public ProductResponseDTO updateProduct(Long id, ProductUpdateDTO productUpdateDTO) {
        log.info("Actualizando producto con ID: {}", id);
        
        RepositoryProductModel product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Producto no encontrado con ID: " + id));

        // Validar nombre duplicado si se está cambiando
        if (productUpdateDTO.getName() != null && 
            !product.getName().equals(productUpdateDTO.getName()) &&
            productRepository.existsByNameAndDeletedFalse(productUpdateDTO.getName())) {
            throw new BusinessValidationException("Ya existe un producto activo con el nombre: " + productUpdateDTO.getName());
        }
        
        if (productUpdateDTO.getName() != null) {
            product.setName(productUpdateDTO.getName());
        }
        if (productUpdateDTO.getDescription() != null) {
            product.setDescription(productUpdateDTO.getDescription());
        }
        if (productUpdateDTO.getPrice() != null) {
            product.setPrice(productUpdateDTO.getPrice());
        }

        RepositoryProductModel updatedProduct = productRepository.save(product);
        
        log.info("Producto actualizado exitosamente");
        return ProductMapper.toResponseDTO(updatedProduct);
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        log.info("Eliminando producto con ID: {}", id);
        
        RepositoryProductModel product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Producto no encontrado con ID: " + id));

        product.setDeleted(true);
        productRepository.save(product);
        
        log.info("Producto marcado como eliminado");
    }

    @Override
    @Transactional
    public ProductResponseDTO restoreProduct(Long id) {
        log.info("Restaurando producto con ID: {}", id);
        
        RepositoryProductModel product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Producto no encontrado con ID: " + id));

        if (!product.getDeleted()) {
            throw new BusinessValidationException("El producto no está eliminado");
        }
        
        // Validar que no exista otro producto activo con el mismo nombre
        if (productRepository.existsByNameAndDeletedFalse(product.getName())) {
            throw new BusinessValidationException("No se puede restaurar. Ya existe un producto activo con el nombre: " + product.getName());
        }

        product.setDeleted(false);
        RepositoryProductModel restoredProduct = productRepository.save(product);
        
        log.info("Producto restaurado exitosamente");
        return ProductMapper.toResponseDTO(restoredProduct);
    }

    @Override
    @Transactional
    public ProductResponseDTO increaseStock(Long id, int quantity) {
        log.info("Aumentando stock del producto ID: {} en {} unidades", id, quantity);
        
        if (quantity <= 0) {
            throw new BusinessValidationException("La cantidad debe ser mayor a cero");
        }
        
        RepositoryProductModel product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Producto no encontrado con ID: " + id));

        int newStock = product.getStock() + quantity;
        product.setStock(newStock);
        
        // Auto-restaurar producto eliminado si se aumenta el stock
        if (product.getDeleted() && newStock > 0) {
            // Verificar que no exista otro producto activo con el mismo nombre
            if (!productRepository.existsByNameAndDeletedFalse(product.getName())) {
                product.setDeleted(false);
                log.info("Producto auto-restaurado al aumentar stock");
            }
        }

        RepositoryProductModel updatedProduct = productRepository.save(product);
        
        log.info("Stock aumentado exitosamente. Nuevo stock: {}", newStock);
        return ProductMapper.toResponseDTO(updatedProduct);
    }

    @Override
    @Transactional
    public ProductResponseDTO decreaseStock(Long id, int quantity) {
        log.info("Reduciendo stock del producto ID: {} en {} unidades", id, quantity);
        
        if (quantity <= 0) {
            throw new BusinessValidationException("La cantidad debe ser mayor a cero");
        }
        
        RepositoryProductModel product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Producto no encontrado con ID: " + id));

        if (product.getStock() < quantity) {
            throw new InsufficientStockException(
                String.format("Stock insuficiente. Stock actual: %d, cantidad solicitada: %d", 
                    product.getStock(), quantity)
            );
        }

        int newStock = product.getStock() - quantity;
        product.setStock(newStock);

        RepositoryProductModel updatedProduct = productRepository.save(product);
        
        log.info("Stock reducido exitosamente. Nuevo stock: {}", newStock);
        return ProductMapper.toResponseDTO(updatedProduct);
    }
}