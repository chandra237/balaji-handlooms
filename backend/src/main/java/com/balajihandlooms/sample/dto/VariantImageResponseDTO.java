package com.balajihandlooms.sample.dto;

import com.balajihandlooms.sample.entity.ProductVariant;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VariantImageResponseDTO {
    private Long id;
    private String imageUrl;
    private Boolean isPrimary;
    private Integer position;
}
