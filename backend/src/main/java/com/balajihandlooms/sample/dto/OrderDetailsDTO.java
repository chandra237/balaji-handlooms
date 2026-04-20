package com.balajihandlooms.sample.dto;

import com.balajihandlooms.sample.entity.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailsDTO {
    private Long orderId;
    private String orderStatus;
    private Double totalAmount;
    private LocalDateTime orderCreatedAt;
    private AddressDetailsDTO address;
    private List<OrderItemDetailsDTO> items;
}
