package org.service_entity.entity.exception;

public class InsufficientStockException extends RuntimeException {

    public InsufficientStockException(Long id, int current, int requested) {
        super("Insufficient stock for product " + id
                + ". Available: " + current + ", requested: " + requested);
    }
}
