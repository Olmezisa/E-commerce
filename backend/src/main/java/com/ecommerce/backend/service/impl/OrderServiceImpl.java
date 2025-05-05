package com.ecommerce.backend.service.impl;

import com.ecommerce.backend.entity.Order;
import com.ecommerce.backend.entity.OrderStatus;
import com.ecommerce.backend.repository.OrderRepository;
import com.ecommerce.backend.service.OrderService;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public Long countOrders() {
        return orderRepository.count();
    }

    @Override
    public long countOrdersBySellerEmail(String sellerEmail) {
        return orderRepository.countBySellerEmail(sellerEmail);
    }

    @Override
    public long countOrdersBySellerEmailAndStatus(String sellerEmail, OrderStatus status) {
        return orderRepository.countBySellerEmailAndStatus(sellerEmail, status);
    }

    @Override
    public BigDecimal sumRevenueBySellerEmail(String sellerEmail) {
        return orderRepository.sumTotalAmountBySellerEmail(sellerEmail);
    }

    @Override
    public List<Order> findOrdersBySellerEmail(String sellerEmail) {
        return orderRepository.findAllBySellerEmail(sellerEmail);
    }
}
