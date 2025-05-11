package com.ecommerce.backend.service.impl;

import com.ecommerce.backend.dto.ProductRequest;
import com.ecommerce.backend.dto.ProductResponse;
import com.ecommerce.backend.dto.SellerDto;
import com.ecommerce.backend.dto.VariantRequest;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.entity.ProductStatus;
import com.ecommerce.backend.entity.ProductVariant;
import com.ecommerce.backend.entity.User;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.repository.ProductVariantRepository;
import com.ecommerce.backend.repository.UserRepository;
import com.ecommerce.backend.service.ProductService;
import com.ecommerce.backend.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final UserService userService;
    private final ProductVariantRepository variantRepository;


    public ProductServiceImpl(ProductRepository productRepository, UserService userService,
    ProductVariantRepository variantRepository) {
        this.productRepository = productRepository;
        this.userService = userService;
        this.variantRepository = variantRepository;

    }


    @Override
    public Product createProduct(ProductRequest request) {
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setImageUrl(request.getImageUrl());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setStatus(ProductStatus.PENDING); 

        User seller = userService.getCurrentUser();
        product.setSeller(seller);

        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
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
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
        product.setPreviousStatus(product.getStatus());
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
    @Override
    public List<Product> getProductsBySellerUsername(String username) {
        return productRepository.findAllBySellerEmail(username);
    }

    @Override
    public long countProductsBySellerUsername(String username) {
        return productRepository.countBySellerEmail(username);
    }
@Override
public Product unbanProduct(Long productId) {
    Product product = productRepository.findById(productId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

    product.setStatus(ProductStatus.ACTIVE);
    product.setPreviousStatus(null);

    return productRepository.save(product);
}

    @Override
    public List<ProductVariant> getVariantsForProduct(Long productId) {
        // Ürünün var olduğundan emin olalım
        if (!productRepository.existsById(productId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
        }
        return variantRepository.findByProductId(productId);
    }

    @Override
    public ProductVariant createVariant(Long productId, VariantRequest dto) {
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

        ProductVariant v = new ProductVariant();
        v.setProduct(product);
        v.setSku(dto.getSku());
        v.setOptionName(dto.getOptionName());
        v.setOptionValue(dto.getOptionValue());
        v.setPrice(dto.getPrice());
        v.setStock(dto.getStock());
        v.setImageUrl(dto.getImageUrl());

        return variantRepository.save(v);
    }

    @Override
    public ProductVariant updateVariant(Long variantId, VariantRequest dto) {
        ProductVariant v = variantRepository.findById(variantId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Variant not found"));

        v.setSku(dto.getSku());
        v.setOptionName(dto.getOptionName());
        v.setOptionValue(dto.getOptionValue());
        v.setPrice(dto.getPrice());
        v.setStock(dto.getStock());
        v.setImageUrl(dto.getImageUrl());

        return variantRepository.save(v);
    }

    @Override
    public void deleteVariant(Long variantId) {
        if (!variantRepository.existsById(variantId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Variant not found");
        }
        variantRepository.deleteById(variantId);
    }

    @Override
    public ProductVariant getVariantById(Long variantId) {
        return variantRepository.findById(variantId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Variant not found"));
    }
}
