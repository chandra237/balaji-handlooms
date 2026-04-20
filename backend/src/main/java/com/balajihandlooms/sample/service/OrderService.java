package com.balajihandlooms.sample.service;

import com.balajihandlooms.sample.dto.*;
import com.balajihandlooms.sample.entity.*;
import com.balajihandlooms.sample.exception.ResourceNotFoundException;
import com.balajihandlooms.sample.exception.UnauthorizedException;
import com.balajihandlooms.sample.repository.*;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final AddressRepository addressRepository;

    @Transactional
    public OrderResponseDTO placeOrder(Long userId, Long addressId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

        List<CartItem> cartItems = cartItemRepository.findByCartIdWithDetails(cart.getId());

        if (cartItems.isEmpty()){
            throw new ResourceNotFoundException("Cart is Empty");
        }

        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found"));

        // Creating order
        Order order = new Order();

        order.setUser(user);
        order.setOrderStatus("CREATED");
        order.setCreatedAt(LocalDateTime.now());

        order.setName(address.getName());
        order.setPhone(address.getPhone());
        order.setStreet(address.getStreet());
        order.setCity(address.getCity());
        order.setState(address.getState());
        order.setPincode(address.getPincode());

        List<OrderItem> items = new ArrayList<>();
        double totalAmount = 0;

        for (CartItem cartItem : cartItems){
            ProductVariant variant = cartItem.getVariant();
            Product product = variant.getProduct();

            double price = product.getPrice();
            int quantity = cartItem.getQuantity();
            double subtotal = price * quantity;

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProductId(product.getId());
            orderItem.setVariantId(variant.getId());
            orderItem.setProductName(product.getName());
            orderItem.setColor(variant.getColor());
            orderItem.setPrice(price);
            orderItem.setQuantity(quantity);
            orderItem.setSubtotal(subtotal);

            items.add(orderItem);
            totalAmount += subtotal;
        }

        order.setOrderItems(items);
        order.setTotalAmount(totalAmount);

        //Saving order
        Order savedOrder = orderRepository.save(order);

        //Clearing cart
        cartItemRepository.deleteAll(cartItems);
        return new OrderResponseDTO(
                savedOrder.getId(),
                savedOrder.getTotalAmount(),
                savedOrder.getOrderStatus()
        );
    }

    @Transactional(readOnly = true)
    public OrderDetailsDTO getOrderDetails(Long userId, Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        if(!order.getUser().getId().equals(userId)){
            throw new UnauthorizedException("Unauthorized");
        }

        AddressDetailsDTO addressDetailsDTO = new AddressDetailsDTO(
                order.getName(),
                order.getPhone(),
                order.getStreet(),
                order.getCity(),
                order.getState(),
                order.getPincode()
        );

        List<OrderItemDetailsDTO> items = order.getOrderItems().stream()
                .map(orderItem -> new OrderItemDetailsDTO(
                        orderItem.getProductName(),
                        orderItem.getColor(),
                        orderItem.getPrice(),
                        orderItem.getQuantity(),
                        orderItem.getSubtotal()
                )).toList();

        return new OrderDetailsDTO(
                order.getId(),
                order.getOrderStatus(),
                order.getTotalAmount(),
                order.getCreatedAt(),
                addressDetailsDTO,
                items
        );
    }

    @Transactional(readOnly = true)
    public List<OrderSummaryDTO> getUserOrders(Long userId) {
        List<Order> orders = orderRepository.findByUserIdOrderByCreatedAt(userId);

        return orders.stream()
                .map(order -> new OrderSummaryDTO(
                        order.getId(),
                        order.getOrderStatus(),
                        order.getTotalAmount(),
                        order.getCreatedAt()
                )).toList();
    }
}
