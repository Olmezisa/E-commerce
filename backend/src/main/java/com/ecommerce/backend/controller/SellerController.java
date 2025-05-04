package com.ecommerce.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.dto.ProductRequest;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.service.ProductService;

@RestController
@RequestMapping("/api/seller")
@PreAuthorize("hasRole('SELLER')")


public class SellerController {
    private final ProductService productService;

    public SellerController(ProductService productService){
        this.productService=productService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<String> sellerHome(){
        return ResponseEntity.ok("works");
    }    

    @PreAuthorize("hasRole('SELLER')")
    @PostMapping("/add-products")
    public ResponseEntity<Product> addProduct(@RequestBody ProductRequest request){
        Product created = productService.createProduct(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

}
