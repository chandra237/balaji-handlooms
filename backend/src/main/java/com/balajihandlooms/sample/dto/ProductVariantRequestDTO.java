package com.balajihandlooms.sample.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductVariantRequestDTO {
    private Long id;

    private String color;

    private Integer stock;

    private String sku;

    private Double price;

    private Boolean active;

    private Integer lowStockThreshold;

    private Boolean isDefault;

    private List<VariantImageRequestDTO> images;
}
