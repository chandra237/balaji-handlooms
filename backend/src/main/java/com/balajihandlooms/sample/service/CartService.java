package com.balajihandlooms.sample.service;

import com.balajihandlooms.sample.dto.*;
import com.balajihandlooms.sample.entity.*;
import com.balajihandlooms.sample.exception.ResourceNotFoundException;
import com.balajihandlooms.sample.repository.CartItemRepository;
import com.balajihandlooms.sample.repository.CartRepository;
import com.balajihandlooms.sample.repository.ProductVariantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@CrossOrigin
public class CartService {
    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;
    private final ProductVariantRepository productVariantRepository;

    @Transactional
    public AddToCartResponseDTO addToCart(AddToCartRequestDTO requestDTO){
        UUID cartId = requestDTO.getCartId();

        Cart cart;
        if(cartId == null){
            cart = new Cart();
            cart.setId(UUID.randomUUID());
            cart.setCreatedAt(LocalDateTime.now());
            cart.setUpdatedAt(LocalDateTime.now());

            cartRepository.save(cart);
        }else{
            cart = cartRepository.findById(cartId).orElseGet(() -> {
                Cart newcart = new Cart();
                newcart.setId(cartId);
                newcart.setCreatedAt(LocalDateTime.now());
                newcart.setUpdatedAt(LocalDateTime.now());
                return cartRepository.save(newcart);
            });
        }

        ProductVariant variant = productVariantRepository.findById(requestDTO.getVariantId())
                .orElseThrow(() -> new ResourceNotFoundException("Variant not found."));

        Optional<CartItem> existingItem = cartItemRepository.findByCartIdAndVariantId(cartId, requestDTO.getVariantId());
        if(existingItem.isPresent()){
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + requestDTO.getQuantity());
            cartItemRepository.save(item);
        }else{
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setQuantity(requestDTO.getQuantity());
            newItem.setVariant(variant);

            cartItemRepository.save(newItem);
        }

        cart.setUpdatedAt(LocalDateTime.now());

        int cartCount = cartItemRepository.findByCartIdWithDetails(cartId).stream().mapToInt(CartItem::getQuantity).sum();

        return new AddToCartResponseDTO(
                cart.getId(),
                cartCount
        );
    }

    @Transactional(readOnly = true)
    public CartResponseDTO getCart(UUID cartId){
        List<CartItem> cartItems = cartItemRepository.findByCartIdWithDetails(cartId);
        List<CartItemResponseDTO> items = cartItems.stream()
            .map(cartItem -> {
                ProductVariant variant = cartItem.getVariant();
                Product product = variant.getProduct();

                String imageUrl = variant.getImages().stream()
                        .filter(VariantImage::getIsPrimary)
                        .findFirst()
                        .map(VariantImage::getImageUrl)
                        .orElse(null);

                Double subtotal = product.getPrice() * cartItem.getQuantity();

                return new CartItemResponseDTO(
                        cartItem.getId(),
                        product.getName(),
                        variant.getColor(),
                        product.getPrice(),
                        cartItem.getQuantity(),
                        subtotal,
                        imageUrl
                );
            }).toList();

            Double totalPrice = items.stream().mapToDouble(CartItemResponseDTO::getSubtotal).sum();
            int totalItems = items.stream().mapToInt(CartItemResponseDTO::getQuantity).sum();

            return new CartResponseDTO(
                    items,
                    totalPrice,
                    totalItems
            );
    }

    @Transactional
    public UpdateCartItemResponseDTO removeCartItem(Long cartItemId){
        CartItem item = cartItemRepository.findById(cartItemId).orElseThrow(() -> new ResourceNotFoundException("CartItem not found"));

        cartItemRepository.delete(item);

        Cart cart = item.getCart();
        int totalItems = cartItemRepository.getTotalItemsByCartId(cart.getId());
        return new UpdateCartItemResponseDTO(
                totalItems
        );
    }

    @Transactional
    public UpdateCartItemResponseDTO updateCartItemQuantity(Long itemId, Integer quantity) {
        CartItem item = cartItemRepository.findById(itemId).orElseThrow(() -> new ResourceNotFoundException("CartItem not found to Update the item."));

        Cart cart = item.getCart();

        if(quantity <= 0){
            cartItemRepository.delete(item);
        }else{
            item.setQuantity(quantity);
        }

        int totalItems = cartItemRepository.getTotalItemsByCartId(cart.getId());
        return new UpdateCartItemResponseDTO(
                totalItems
        );
    }

}
