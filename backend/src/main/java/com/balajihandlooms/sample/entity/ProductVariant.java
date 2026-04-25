package com.balajihandlooms.sample.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "product_variants",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "sku")
    }
)
public class ProductVariant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String color;

    private Integer stock;

    @Column(nullable = false, unique = true)
    private  String sku;

    private Double price;

    private Boolean active;

    private Integer lowStockThreshold;

    private Boolean isDefault;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @OneToMany(mappedBy = "variant", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("position ASC")
    private List<VariantImage> images;
}
