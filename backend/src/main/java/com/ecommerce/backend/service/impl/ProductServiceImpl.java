package com.ecommerce.backend.service.impl;

import com.ecommerce.backend.dto.ProductRequest;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.entity.ProductStatus;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product createProduct(ProductRequest request) {
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setImageUrl(request.getImageUrl());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setStatus(ProductStatus.PENDING); // varsayılan olarak onay bekliyor

        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Override
    public Product updateProduct(Long id, ProductRequest request) {
        Product product = getProductById(id);

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setImageUrl(request.getImageUrl());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setStatus(request.getStatus());

        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
    @Override
    public Product approveProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setStatus(ProductStatus.ACTIVE);
        return productRepository.save(product);
    }

    @Override
    public Product rejectProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setStatus(ProductStatus.BANNED);
        return productRepository.save(product);
    }
    @Override
    public List<Product> getProductsByStatus(ProductStatus status) {
        return productRepository.findByStatus(status);
    }
    @Override
    public Long countProducts() {
        return productRepository.count();
    }

    
}
