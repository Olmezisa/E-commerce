package com.ecommerce.backend.dto;

import com.ecommerce.backend.entity.ProductStatus;
import java.math.BigDecimal;

public class ProductResponse {
    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    private int stock;
    private String imageUrl;
    private ProductStatus status;
    private String sellerName;

    public ProductResponse(Long id, String title, String description, BigDecimal price, int stock,
                           String imageUrl, ProductStatus status, String sellerName) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.imageUrl = imageUrl;
        this.status = status;
        this.sellerName = sellerName;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public BigDecimal getPrice() { return price; }
    public int getStock() { return stock; }
    public String getImageUrl() { return imageUrl; }
    public ProductStatus getStatus() { return status; }
    public String getSellerName() { return sellerName; }
}
