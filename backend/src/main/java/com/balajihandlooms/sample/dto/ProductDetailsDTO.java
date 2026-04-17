package com.balajihandlooms.sample.dto;

import com.balajihandlooms.sample.entity.ProductVariant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailsDTO {
    private Long id;
    private String name;
    private String slug;
    private Double price;
    private String description;
    private String categoryName;
    private String categorySlug;
    private List<ProductVariantDTO> variants;
}
