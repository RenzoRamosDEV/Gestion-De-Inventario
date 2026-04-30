package org.service_entity.entity.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.service_entity.entity.exception.InsufficientStockException;
import org.service_entity.entity.exception.ProductNotFoundException;
import org.service_entity.entity.repository.ProductRepository;
import org.service_entity.entity.repository.model.RepositoryProductModel;
import org.service_entity.entity.service.impl.ProductServiceImpl;
import org.service_entity.entity.service.model.*;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository repository;

    @Mock
    private ProductMapper mapper;

    @InjectMocks
    private ProductServiceImpl service;

    @Test
    void createProduct_success() {
        ProductCreateDTO dto = new ProductCreateDTO("Teclado", "Mecánico", BigDecimal.valueOf(50.0));
        RepositoryProductModel model = RepositoryProductModel.builder()
                .name("Teclado").price(BigDecimal.valueOf(50.0)).stock(0).deleted(false).build();
        ProductResponseDTO response = new ProductResponseDTO(1L, "Teclado", "Mecánico", BigDecimal.valueOf(50.0), 0, false, null);

        when(mapper.toRepositoryModel(dto)).thenReturn(model);
        when(repository.save(any())).thenReturn(model);
        when(mapper.toResponseDTO(model)).thenReturn(response);

        ProductResponseDTO result = service.create(dto);

        assertNotNull(result);
        assertEquals("Teclado", result.getName());
        verify(repository).save(any());
    }

    @Test
    void findById_productExists_returnsDTO() {
        RepositoryProductModel model = RepositoryProductModel.builder()
                .id(1L).name("Mouse").stock(5).build();
        ProductResponseDTO response = new ProductResponseDTO(1L, "Mouse", null, BigDecimal.ONE, 5, false, null);

        when(repository.findById(1L)).thenReturn(Optional.of(model));
        when(mapper.toResponseDTO(model)).thenReturn(response);

        ProductResponseDTO result = service.findById(1L);

        assertEquals(1L, result.getId());
        assertEquals("Mouse", result.getName());
    }

    @Test
    void findById_notFound_throwsException() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ProductNotFoundException.class, () -> service.findById(99L));
    }

    @Test
    void decreaseStock_valid_reducesStock() {
        RepositoryProductModel product = RepositoryProductModel.builder()
                .id(1L).name("Monitor").stock(10).build();
        StockRequestDTO dto = new StockRequestDTO(5);
        ProductResponseDTO response = new ProductResponseDTO(1L, "Monitor", null, BigDecimal.valueOf(200), 5, false, null);

        when(repository.findById(1L)).thenReturn(Optional.of(product));
        when(repository.save(any())).thenReturn(product);
        when(mapper.toResponseDTO(product)).thenReturn(response);

        service.decreaseStock(1L, dto);

        assertEquals(5, product.getStock());
        verify(repository).save(product);
    }

    @Test
    void decreaseStock_insufficientStock_throwsException() {
        RepositoryProductModel product = RepositoryProductModel.builder()
                .id(1L).name("Monitor").stock(3).build();
        StockRequestDTO dto = new StockRequestDTO(10);

        when(repository.findById(1L)).thenReturn(Optional.of(product));

        assertThrows(InsufficientStockException.class, () -> service.decreaseStock(1L, dto));
        verify(repository, never()).save(any());
    }
}
