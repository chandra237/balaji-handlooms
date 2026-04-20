package com.balajihandlooms.sample.controller;

import com.balajihandlooms.sample.dto.OrderDetailsDTO;
import com.balajihandlooms.sample.dto.OrderRequestDTO;
import com.balajihandlooms.sample.dto.OrderResponseDTO;
import com.balajihandlooms.sample.dto.OrderSummaryDTO;
import com.balajihandlooms.sample.entity.User;
import com.balajihandlooms.sample.exception.ResourceNotFoundException;
import com.balajihandlooms.sample.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponseDTO> placeOrder(@RequestBody OrderRequestDTO requestDTO, @AuthenticationPrincipal User user){
        if(user == null){
            throw new ResourceNotFoundException("User not found");
        }
        return ResponseEntity.ok(orderService.placeOrder(user.getId(), requestDTO.getAddressId()));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDetailsDTO> getOrderDetails(@AuthenticationPrincipal User user, @PathVariable Long orderId){
        if(user == null){
            throw new ResourceNotFoundException("User not found");
        }
        return ResponseEntity.ok(orderService.getOrderDetails(user.getId(), orderId));
    }

    @GetMapping
    public ResponseEntity<List<OrderSummaryDTO>> getUserOrders(@AuthenticationPrincipal User user){
        if(user == null){
            throw new ResourceNotFoundException("User not found");
        }
        return ResponseEntity.ok(orderService.getUserOrders(user.getId()));
    }

}
