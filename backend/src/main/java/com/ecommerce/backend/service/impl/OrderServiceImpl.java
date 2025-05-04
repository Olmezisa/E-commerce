package com.ecommerce.backend.service.impl;

import com.ecommerce.backend.repository.OrderRepository;
import com.ecommerce.backend.service.OrderService;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public Long countOrders() {
        return orderRepository.count();
    }
}