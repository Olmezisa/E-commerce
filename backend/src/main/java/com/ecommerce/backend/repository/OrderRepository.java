package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.Order;
import com.ecommerce.backend.entity.OrderStatus;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<Order, Long> {
       long countBySellerEmail(String email);
    long countBySellerEmailAndStatus(String email, OrderStatus status);
    List<Order> findAllBySellerEmail(String email);

    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o JOIN o.seller s WHERE s.email = :email")
    BigDecimal sumTotalAmountBySellerEmail(@Param("email") String email);
}