package com.balajihandlooms.sample.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductCardDTO {
    private Long id;
    private String name;
    private String slug;
    private Double price;
    private String imageUrl;
}
