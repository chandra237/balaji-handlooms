package com.balajihandlooms.sample.dto;

import com.balajihandlooms.sample.entity.VariantImage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductVariantDTO {
    private Long id;
    private String color;
    private Integer stock;
    private Boolean isDefault;
    private List<VariantImageDTO> images;
}
