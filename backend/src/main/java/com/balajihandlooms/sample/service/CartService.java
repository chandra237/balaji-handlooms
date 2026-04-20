package com.balajihandlooms.sample.service;

import com.balajihandlooms.sample.dto.*;
import com.balajihandlooms.sample.entity.*;
import com.balajihandlooms.sample.exception.ResourceNotFoundException;
import com.balajihandlooms.sample.exception.UnauthorizedException;
import com.balajihandlooms.sample.repository.CartItemRepository;
import com.balajihandlooms.sample.repository.CartRepository;
import com.balajihandlooms.sample.repository.ProductVariantRepository;
import com.balajihandlooms.sample.repository.UserRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;
    private final ProductVariantRepository productVariantRepository;
    private final UserRepository userRepository;

    @Autowired
    private EntityManager entityManager;

    @Transactional
    public AddToCartResponseDTO addToCartGuest(AddToCartRequestDTO requestDTO){
        UUID cartId = requestDTO.getCartId();

        Cart cart;
        if(cartId == null){
            cart = new Cart();
            cart.setCreatedAt(LocalDateTime.now());
            cart.setUpdatedAt(LocalDateTime.now());
            cartRepository.save(cart);
        }else{
            cart = cartRepository.findById(cartId)
                    .orElseThrow(() -> new ResourceNotFoundException("Invalid or expired cart"));
        }

        ProductVariant variant = productVariantRepository.findById(requestDTO.getVariantId())
                .orElseThrow(() -> new ResourceNotFoundException("Variant not found."));

        Optional<CartItem> existingItem = cartItemRepository.findByCartIdAndVariantId(cart.getId(), requestDTO.getVariantId());
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

        int cartCount = cartItemRepository.findByCartIdWithDetails(cart.getId()).stream().mapToInt(CartItem::getQuantity).sum();

        return new AddToCartResponseDTO(
                cart.getId(),
                cartCount
        );
    }

    @Transactional(readOnly = true)
    public CartResponseDTO getGuestCart(UUID cartId){
        return getCart(cartId);
    }

    @Transactional
    public UpdateCartItemResponseDTO removeGuestCartItem(Long cartItemId){
        CartItem item = cartItemRepository.findById(cartItemId).orElseThrow(() -> new ResourceNotFoundException("CartItem not found"));

        cartItemRepository.delete(item);

        Cart cart = item.getCart();
        int totalItems = cartItemRepository.getTotalItemsByCartId(cart.getId());
        return new UpdateCartItemResponseDTO(
                totalItems
        );
    }

    @Transactional
    public UpdateCartItemResponseDTO updateGuestCartItemQuantity(Long itemId, Integer quantity) {
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

    @Transactional
    public UpdateCartItemResponseDTO addToCartUser(Long userId, AddToCartRequestDTO requestDTO) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
                    newCart.setUser(user);
                    newCart.setCreatedAt(LocalDateTime.now());
                    newCart.setUpdatedAt(LocalDateTime.now());
                    return cartRepository.save(newCart);
                });

        ProductVariant variant = productVariantRepository.findById(requestDTO.getVariantId())
                .orElseThrow(() -> new ResourceNotFoundException("Variant not found"));

        Optional<CartItem> existingItem = cartItemRepository.findByCartIdAndVariantId(cart.getId(), variant.getId());
        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + requestDTO.getQuantity());
        } else {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setVariant(variant);
            newItem.setQuantity(requestDTO.getQuantity());

            cartItemRepository.save(newItem);
        }
        cart.setUpdatedAt(LocalDateTime.now());

        int totalItems = cartItemRepository.getTotalItemsByCartId(cart.getId());

        return new UpdateCartItemResponseDTO(totalItems);

    }

    @Transactional(readOnly = true)
    public CartResponseDTO getCartByUser(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));
        return getCart(cart.getId());
    }

    @Transactional
    public UpdateCartItemResponseDTO removeCartItemForUser(Long userId, Long cartItemId) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("CartItem not found"));

        // security check
        if(!item.getCart().getUser().getId().equals(userId)){
            throw new UnauthorizedException("Unauthorized user");
        }

        cartItemRepository.delete(item);
        Cart cart = item.getCart();
        int totalItems = cartItemRepository.getTotalItemsByCartId(cart.getId());
        return new UpdateCartItemResponseDTO(
                totalItems
        );
    }

    @Transactional
    public UpdateCartItemResponseDTO updateCartItemQuantityForUser(Long userId, Long cartItemId, Integer quantity) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("CartItem not found"));

        // security check
        if(!item.getCart().getUser().getId().equals(userId)){
            throw new UnauthorizedException("Unauthorized user");
        }

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

    @Transactional(readOnly = true)
    private CartResponseDTO getCart(UUID cartId) {
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
    public void mergeCart(UUID cartId, Long userId) {
        Cart guestCart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Guest cart not found"));

        Cart userCart = cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    newCart.setUpdatedAt(LocalDateTime.now());
                    newCart.setCreatedAt(LocalDateTime.now());
                    return cartRepository.save(newCart);
                });

        List<CartItem> guestItems = new ArrayList<>(cartItemRepository.findByCartIdWithDetails(cartId));
        System.out.println("guest items: "+guestItems.size());
        List<CartItem> toDelete = new ArrayList<>();

        for (CartItem guestCartItem : guestItems){
            ProductVariant variant = guestCartItem.getVariant();

            Optional<CartItem> existingItem = cartItemRepository.findByCartIdAndVariantId(userCart.getId(), variant.getId());

            if(existingItem.isPresent()){
                CartItem item = existingItem.get();
                item.setQuantity(item.getQuantity() + guestCartItem.getQuantity());

                toDelete.add(guestCartItem);
            }else{
                guestCartItem.setCart(userCart);
            }
        }

        userCart.setUpdatedAt(LocalDateTime.now());
        entityManager.flush();
        cartItemRepository.deleteAll(toDelete);
        entityManager.flush();
        cartRepository.delete(guestCart);
    }
}
