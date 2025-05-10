package com.ecommerce.backend.service.impl;

import com.ecommerce.backend.entity.CartItem;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.entity.User;
import com.ecommerce.backend.repository.CartItemRepository;
import com.ecommerce.backend.service.CartService;
import com.ecommerce.backend.service.ProductService;
import com.ecommerce.backend.service.UserService;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
public class CartServiceImpl implements CartService {
    private final CartItemRepository cartRepo;
    private final UserService userService;
    private final ProductService productService;

    public CartServiceImpl(CartItemRepository cartRepo,
                           UserService userService,
                           ProductService productService) {
        this.cartRepo = cartRepo;
        this.userService = userService;
        this.productService = productService;
    }

    @Override
    public void addToCart(Long productId, int quantity, Principal principal) {
        
        User user = userService.getCurrentUser();
        Product product = productService.getProductById(productId);

        String email = user.getEmail();
        CartItem item = cartRepo.findByUserEmailAndProductId(email, productId)
                .orElseGet(() -> {
                    CartItem ci = new CartItem();
                    ci.setUser(user);
                    ci.setProduct(product);
                    ci.setQuantity(0);
                    return ci;
                });
        item.setQuantity(item.getQuantity() + quantity);
        cartRepo.save(item);
    }

    @Override
    public List<CartItem> getCartItems(Principal principal) {
        
        User user = userService.getCurrentUser();
        return cartRepo.findByUserEmail(user.getEmail());
    }

    @Override
    public void removeFromCart(Long productId, Principal principal) {
        User user = userService.getCurrentUser();
        cartRepo.deleteByUserEmailAndProductId(user.getEmail(), productId);
    }

    @Override
    public void clearCart(Principal principal) {
        User user = userService.getCurrentUser();
        cartRepo.findByUserEmail(user.getEmail())
                .forEach(cartRepo::delete);
    }
}