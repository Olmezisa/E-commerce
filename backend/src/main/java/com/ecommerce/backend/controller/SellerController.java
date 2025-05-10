package com.ecommerce.backend.controller;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.dto.ProductRequest;
import com.ecommerce.backend.dto.SellerDashboardDto;
import com.ecommerce.backend.entity.OrderStatus;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.service.OrderService;
import com.ecommerce.backend.service.ProductService;

@RestController
@RequestMapping("/api/seller")
@PreAuthorize("hasRole('SELLER')")


public class SellerController {
    private final ProductService productService;
    private final OrderService orderService;

    public SellerController(ProductService productService,OrderService orderService){
        this.productService=productService;
        this.orderService=orderService;
    }
    
    @GetMapping("/dashboard")
    public ResponseEntity<SellerDashboardDto> getDashboard(Principal principal) {
        String email = principal.getName();
        long totalProducts   = productService.countProductsBySellerUsername(email);
        long totalOrders     = orderService.countOrdersBySellerEmail(email);
        long pendingOrders   = orderService.countOrdersBySellerEmailAndStatus(email, OrderStatus.PENDING);
        BigDecimal revenue   = orderService.sumRevenueBySellerEmail(email);
        SellerDashboardDto dto = new SellerDashboardDto(totalProducts, totalOrders, pendingOrders, revenue);
        return ResponseEntity.ok(dto);
    }
    @GetMapping("/my-products")
    public ResponseEntity<List<Product>> getMyProducts(Principal principal) {
        String email = principal.getName();
        List<Product> products = productService.getProductsBySellerUsername(email);
        return ResponseEntity.ok(products);
    }


}
