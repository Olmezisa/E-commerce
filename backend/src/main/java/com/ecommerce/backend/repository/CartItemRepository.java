package com.ecommerce.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.backend.entity.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
  List<CartItem> findByUserEmail(String email);
  Optional<CartItem> findByUserEmailAndProductId(String email, Long productId);
  void deleteByUserEmailAndProductId(String email, Long productId);
}
