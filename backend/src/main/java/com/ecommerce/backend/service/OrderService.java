package com.ecommerce.backend.service;

import java.math.BigDecimal;
import java.util.List;

import com.ecommerce.backend.entity.Order;
import com.ecommerce.backend.entity.OrderStatus;

public interface OrderService {
    Long countOrders();
    long countOrdersBySellerEmail(String sellerEmail);
    long countOrdersBySellerEmailAndStatus(String sellerEmail, OrderStatus status);
    BigDecimal sumRevenueBySellerEmail(String sellerEmail);
    // varsa liste çekmek için:
    List<Order> findOrdersBySellerEmail(String sellerEmail);
    
    
}