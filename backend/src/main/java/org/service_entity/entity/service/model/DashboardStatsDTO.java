package org.service_entity.entity.service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para estadísticas del dashboard.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDTO {
    
    private long totalProducts;
    private long activeProducts;
    private long deletedProducts;
    private long outOfStockProducts;
    private long lowStockProducts;
    private double totalInventoryValue;
}