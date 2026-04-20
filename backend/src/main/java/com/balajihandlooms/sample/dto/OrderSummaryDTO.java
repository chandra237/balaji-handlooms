package com.balajihandlooms.sample.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderSummaryDTO {
    private Long id;
    private String status;
    private Double totalAmount;
    private LocalDateTime createdAt;
}
