package com.balajihandlooms.sample.repository;

import com.balajihandlooms.sample.dto.ProductCardDTO;
import com.balajihandlooms.sample.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @EntityGraph(attributePaths = {"variants","variants.images"})
    Optional<Product> findBySlug(String slug);


    @Query("""
        SELECT new com.balajihandlooms.sample.dto.ProductCardDTO(
            p.id,
            p.name,
            p.slug,
            p.price,
            vi.imageUrl
        )
        FROM Product p
        JOIN ProductVariant pv ON pv.product.id = p.id
        JOIN VariantImage vi ON vi.variant.id = pv.id
        WHERE pv.isDefault = true
        AND vi.isPrimary = true
    """)
    List<ProductCardDTO> findProductCards();

    @Query("""
    SELECT DISTINCT new com.balajihandlooms.sample.dto.ProductCardDTO(
        p.id,
        p.name,
        p.slug,
        COALESCE(pv.price, p.price),
        vi.imageUrl
    )
    FROM Product p
    JOIN p.category c
    JOIN p.variants pv ON pv.isDefault = true
    JOIN pv.images vi ON vi.isPrimary = true
    WHERE c.slug = :slug
    """)
    List<ProductCardDTO> findProductsByCategorySlug(String slug);

    @Query(""" 
            SELECT DISTINCT new com.balajihandlooms.sample.dto.ProductCardDTO(
            p.id,
            p.name,
            p.slug,
            p.price,
            vi.imageUrl
        )
        FROM Product p
        JOIN p.variants pv
        JOIN pv.images vi
        WHERE p.featured = true
        AND pv.isDefault = true
        AND vi.isPrimary = true
        """)
    Page<ProductCardDTO> findFeaturedProducts(Pageable pageable);

    @Query("""
        SELECT new com.balajihandlooms.sample.dto.ProductCardDTO(
            p.id,
            p.name,
            p.slug,
            p.price,
            vi.imageUrl
        )
        FROM Product p
        JOIN ProductVariant pv ON pv.product.id = p.id
        JOIN VariantImage vi ON vi.variant.id = pv.id
        WHERE p.category.id = :categoryId
        AND p.id != :productId
        AND pv.isDefault = true
        AND vi.isPrimary = true
    """)
    Page<ProductCardDTO> findRelatedProductsBySlug(Long categoryId, Long productId, Pageable pageable);
}
