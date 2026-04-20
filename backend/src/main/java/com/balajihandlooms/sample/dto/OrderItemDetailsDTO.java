package com.balajihandlooms.sample.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemDetailsDTO {
    private String productName;
    private String color;
    private Double price;
    private Integer quantity;
    private Double subtotal;
}
