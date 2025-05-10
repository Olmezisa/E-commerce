package com.ecommerce.backend.dto;

import com.ecommerce.backend.entity.CartItem;
import java.math.BigDecimal;

public class CartItemDto {
    private Long productId;
    private String productName;
    private BigDecimal price;
    private int quantity;

    public CartItemDto(Long productId, String productName, BigDecimal price, int quantity) {
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
    }

    public static CartItemDto fromEntity(CartItem item) {
        return new CartItemDto(
            item.getProduct().getId(),
            item.getProduct().getName(),
            item.getProduct().getPrice(),
            item.getQuantity()
        );
    }

    // Getters
    public Long getProductId() { return productId; }
    public String getProductName() { return productName; }
    public BigDecimal getPrice() { return price; }
    public int getQuantity() { return quantity; }
}