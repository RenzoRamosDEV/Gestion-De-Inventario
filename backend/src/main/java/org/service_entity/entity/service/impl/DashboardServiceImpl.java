package org.service_entity.entity.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.service_entity.entity.repository.ProductRepository;
import org.service_entity.entity.service.DashboardService;
import org.service_entity.entity.service.model.DashboardStatsDTO;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

/**
 * Implementación del servicio de dashboard.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class DashboardServiceImpl implements DashboardService {

    private final ProductRepository productRepository;
    
    @Override
    public DashboardStatsDTO getDashboardStats() {
        log.info("Obteniendo estadísticas del dashboard");
        
        long totalProducts = productRepository.countAll();
        long activeProducts = productRepository.countByDeleted(false);
        long deletedProducts = productRepository.countByDeleted(true);
        long outOfStockProducts = productRepository.countByStockEqualsAndDeleted(0, false);
        long lowStockProducts = productRepository.countByStockLessThanAndDeleted(10, false);
        
        // Calcular valor total del inventario
        double totalValue = productRepository.calculateTotalInventoryValue();
        
        return new DashboardStatsDTO(
            totalProducts,
            activeProducts,
            deletedProducts,
            outOfStockProducts,
            lowStockProducts,
            totalValue
        );
    }
}