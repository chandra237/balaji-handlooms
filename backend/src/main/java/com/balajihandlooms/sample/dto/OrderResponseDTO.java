package com.balajihandlooms.sample.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderResponseDTO {
    private Long orderId;
    private Double totalAmount;
    private String status;
}

