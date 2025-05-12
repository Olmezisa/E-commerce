package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.Order;
import com.ecommerce.backend.entity.OrderStatus;
import com.ecommerce.backend.entity.User;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<Order, Long> {
       long countBySellerEmail(String email);
    long countBySellerEmailAndStatus(String email, OrderStatus status);
    List<Order> findAllBySellerEmail(String email);

    @Query("""
      SELECT COALESCE(SUM(item.unitPrice * item.quantity), 0)
        FROM Order o
        JOIN o.seller s
        JOIN o.items item
       WHERE s.email = :sellerEmail
    """)
    BigDecimal sumTotalAmountBySellerEmail(@Param("sellerEmail") String sellerEmail);

    List<Order> findAllByBuyer(User buyer);
    List<Order> findAllBySeller(User seller);
    
}