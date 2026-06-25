package com.ecommerce.controller;

import com.ecommerce.entity.Cart;
import com.ecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired private CartService cartService;

    @GetMapping
    public ResponseEntity<Cart> getCart(Principal principal) {
        return ResponseEntity.ok(cartService.getCartByEmail(principal.getName()));
    }

    @PostMapping("/add/{productId}")
    public ResponseEntity<Cart> addToCart(@PathVariable Long productId,
                                          @RequestParam(defaultValue = "1") int quantity,
                                          Principal principal) {
        return ResponseEntity.ok(cartService.addToCart(principal.getName(), productId, quantity));
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<Cart> removeFromCart(@PathVariable Long productId, Principal principal) {
        return ResponseEntity.ok(cartService.removeFromCart(principal.getName(), productId));
    }

    @PutMapping("/update/{productId}")
    public ResponseEntity<Cart> updateCartItem(@PathVariable Long productId,
                                               @RequestParam int quantity,
                                               Principal principal) {
        return ResponseEntity.ok(cartService.updateCartItem(principal.getName(), productId, quantity));
    }
}
