package org.service_entity.entity.service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para operaciones de stock.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockMovementDTO {
    private Long productId;
    private String productName;
    private Integer previousStock;
    private Integer newStock;
    private Integer quantity;
    private String movementType; // "INCREASE" or "DECREASE"
    private String timestamp;
}