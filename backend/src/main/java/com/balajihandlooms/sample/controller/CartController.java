package com.balajihandlooms.sample.controller;

import com.balajihandlooms.sample.dto.*;
import com.balajihandlooms.sample.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<AddToCartResponseDTO> addToCart(@RequestBody AddToCartRequestDTO requestDTO){
        return ResponseEntity.ok(cartService.addToCart(requestDTO));
    }

    @GetMapping
    public ResponseEntity<CartResponseDTO> getCart(@RequestParam UUID cartId){
        return ResponseEntity.ok(cartService.getCart(cartId));
    }

    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<UpdateCartItemResponseDTO> removeCartItem(@PathVariable Long itemId){
        return ResponseEntity.ok(cartService.removeCartItem(itemId));
    }

    @PutMapping("/update")
    public ResponseEntity<UpdateCartItemResponseDTO> updateCartItemQuantity(@RequestBody UpdateCartItemRequestDTO updateCartItemRequestDTO){
        UpdateCartItemResponseDTO updateCartItemResponseDTO = cartService.updateCartItemQuantity(updateCartItemRequestDTO.getCartItemId(), updateCartItemRequestDTO.getQuantity());
        return ResponseEntity.ok(updateCartItemResponseDTO);
    }

}
