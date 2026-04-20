package com.balajihandlooms.sample.controller;

import com.balajihandlooms.sample.dto.*;
import com.balajihandlooms.sample.entity.User;
import com.balajihandlooms.sample.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    // GUEST CART APIs

    @PostMapping("/guest/add")
    public ResponseEntity<AddToCartResponseDTO> addToCartGuest(@RequestBody AddToCartRequestDTO requestDTO){
        return ResponseEntity.ok(cartService.addToCartGuest(requestDTO));
    }

    @GetMapping("/guest")
    public ResponseEntity<CartResponseDTO> getGuestCart(@RequestParam UUID cartId){
        return ResponseEntity.ok(cartService.getGuestCart(cartId));
    }

    @DeleteMapping("/guest/item/{itemId}")
    public ResponseEntity<UpdateCartItemResponseDTO> removeGuestCartItem(@PathVariable Long itemId){
        return ResponseEntity.ok(cartService.removeGuestCartItem(itemId));
    }

    @PutMapping("/guest/update")
    public ResponseEntity<UpdateCartItemResponseDTO> updateGuestCartItemQuantity(@RequestBody UpdateCartItemRequestDTO updateCartItemRequestDTO){
        UpdateCartItemResponseDTO updateCartItemResponseDTO = cartService.updateGuestCartItemQuantity(updateCartItemRequestDTO.getCartItemId(), updateCartItemRequestDTO.getQuantity());
        return ResponseEntity.ok(updateCartItemResponseDTO);
    }

    // USER CART APIs

    @PostMapping("/add")
    public ResponseEntity<UpdateCartItemResponseDTO> addToCartUser(@RequestBody AddToCartRequestDTO requestDTO, @AuthenticationPrincipal User user) {
        if(user == null){
            return ResponseEntity.status(401).build();
        }

        return ResponseEntity.ok(cartService.addToCartUser(user.getId(), requestDTO));
    }

    @GetMapping
    public ResponseEntity<CartResponseDTO> getUserCart(@AuthenticationPrincipal User user) {
        if(user == null){
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(cartService.getCartByUser(user.getId()));
    }

    @PutMapping("/update")
    public ResponseEntity<UpdateCartItemResponseDTO> updateUserCartItem(@RequestBody UpdateCartItemRequestDTO requestDTO, @AuthenticationPrincipal User user) {
        if(user == null){
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(cartService.updateCartItemQuantityForUser(user.getId(), requestDTO.getCartItemId(), requestDTO.getQuantity()));
    }

    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<UpdateCartItemResponseDTO> removeUserCartItem(@PathVariable Long itemId, @AuthenticationPrincipal User user) {
        if(user == null){
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(cartService.removeCartItemForUser(user.getId(), itemId));

    }

    @PostMapping("/merge")
    public ResponseEntity<String> mergeCart(@RequestBody Map<String, String> request, @AuthenticationPrincipal User user){
        if(user == null){
            return ResponseEntity.status(401).build();
        }
        UUID cartId = UUID.fromString(request.get("cartId"));

        cartService.mergeCart(cartId, user.getId());

        return ResponseEntity.ok("Cart merged successfully");
    }

}
