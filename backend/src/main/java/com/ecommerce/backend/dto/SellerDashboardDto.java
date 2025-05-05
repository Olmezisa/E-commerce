package com.ecommerce.backend.dto;


import java.math.BigDecimal;

public class SellerDashboardDto {
    private long totalProducts;
    private long totalOrders;
    private long pendingOrders;
    private BigDecimal totalRevenue;


    public SellerDashboardDto(long totalProducts,
                              long totalOrders,
                              long pendingOrders,
                              BigDecimal totalRevenue) {
        this.totalProducts = totalProducts;
        this.totalOrders = totalOrders;
        this.pendingOrders = pendingOrders;
        this.totalRevenue = totalRevenue;
    }
    
    public long getPendingOrders() {
        return pendingOrders;
    }
    public void setPendingOrders(long pendingOrders) {
        this.pendingOrders = pendingOrders;
    }
    public long getTotalOrders() {
        return totalOrders;
    }
    public void setTotalOrders(long totalOrders) {
        this.totalOrders = totalOrders;
    }
    public long getTotalProducts() {
        return totalProducts;
    }
    public void setTotalProducts(long totalProducts) {
        this.totalProducts = totalProducts;
    }
    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }
    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
    
}
