package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.CartItemDto;
import com.ecommerce.backend.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@PreAuthorize("isAuthenticated()")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public ResponseEntity<Void> addToCart(@RequestParam Long productId,
                                          @RequestParam int quantity,
                                          Principal principal) {
        cartService.addToCart(productId, quantity, principal);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<CartItemDto>> listCart(Principal principal) {
        List<CartItemDto> items = cartService.getCartItems(principal)
                                    .stream()
                                    .map(CartItemDto::fromEntity)
                                    .toList();
        return ResponseEntity.ok(items);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Void> remove(@RequestParam Long productId,
                                       Principal principal) {
        cartService.removeFromCart(productId, principal);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clear(Principal principal) {
        cartService.clearCart(principal);
        return ResponseEntity.noContent().build();
    }
}
