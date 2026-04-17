package com.balajihandlooms.sample.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartResponseDTO {

    private List<CartItemResponseDTO> cartItems;
    private Double subTotal;
    private Integer totalItems;

}
