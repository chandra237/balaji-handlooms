package com.balajihandlooms.sample.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "variant_images")
public class VariantImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageUrl;

    private Boolean isPrimary;

    private Integer position;

    @ManyToOne
    @JoinColumn(name = "variant_id")
    private ProductVariant variant;
}
