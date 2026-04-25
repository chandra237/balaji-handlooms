package com.balajihandlooms.sample.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminProductListDTO {
    private Long id;
    private String name;
    private String categoryName;
    private Double price;
    private Boolean featured;
    private Integer variantCount;
}
