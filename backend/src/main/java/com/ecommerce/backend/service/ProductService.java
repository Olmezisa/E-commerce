package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.ProductRequest;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.entity.ProductStatus;

import java.util.List;

public interface ProductService {
    Product createProduct(ProductRequest request);
    List<Product> getAllProducts();
    Product getProductById(Long id);
    Product updateProduct(Long id, ProductRequest request);
    void deleteProduct(Long id);
    Product approveProduct(Long productId);
    Product rejectProduct(Long productId);
    List<Product> getProductsByStatus(ProductStatus status);
    Long countProducts();
    long countProductsBySellerUsername(String username);
    List<Product> getProductsBySellerUsername(String username);
    Product unbanProduct(Long id);
    

}
