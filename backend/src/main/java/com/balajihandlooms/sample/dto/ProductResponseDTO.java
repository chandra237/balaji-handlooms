package com.balajihandlooms.sample.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponseDTO {
    private Long id;
    private String name;
    private String slug;
    private Double price;
    private String description;
    private Boolean featured;
    private Long categoryId;
    private String categoryName;
    private Set<ProductVariantResponseDTO> variants;
}
