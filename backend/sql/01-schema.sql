CREATE DATABASE IF NOT EXISTS inventario;
USE inventario;

CREATE TABLE IF NOT EXISTS products (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255)   NOT NULL,
    description TEXT,
    price       DECIMAL(10,2)  NOT NULL,
    stock       INT            NOT NULL DEFAULT 0,
    deleted     TINYINT(1)     NOT NULL DEFAULT 0,
    created_at  DATETIME,
    updated_at  DATETIME,
    INDEX idx_products_name (name)
);
