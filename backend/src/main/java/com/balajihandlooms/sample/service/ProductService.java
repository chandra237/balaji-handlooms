package com.balajihandlooms.sample.service;

import com.balajihandlooms.sample.dto.ProductCardDTO;
import com.balajihandlooms.sample.dto.ProductDetailsDTO;
import com.balajihandlooms.sample.dto.ProductVariantDTO;
import com.balajihandlooms.sample.dto.VariantImageDTO;
import com.balajihandlooms.sample.entity.Product;
import com.balajihandlooms.sample.entity.VariantImage;
import com.balajihandlooms.sample.exception.ResourceNotFoundException;
import com.balajihandlooms.sample.repository.ProductRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    public List<ProductCardDTO> getAllProducts(){
        return productRepository.findProductCards();
    }

    public List<ProductCardDTO> getProductsByCategory(String categorySlug) {
        return productRepository.findProductsByCategorySlug(categorySlug);
    }

    public ProductDetailsDTO getProductDetailsBySlug(String slug) {
        Product product = productRepository.findBySlug(slug).orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        List<ProductVariantDTO> variantDTOS = product.getVariants().stream()
                .map(variant -> {
                    List<VariantImageDTO> variantImageDTOS = variant.getImages().stream()
                            .map(image -> {
                                return new VariantImageDTO(
                                        image.getId(),
                                        image.getImageUrl(),
                                        image.getIsPrimary()
                                );
                            }).toList();

                    return new ProductVariantDTO(
                            variant.getId(),
                            variant.getColor(),
                            variant.getStock(),
                            variant.getIsDefault(),
                            variantImageDTOS
                    );
                }).toList();

        return new ProductDetailsDTO(
                product.getId(),
                product.getName(),
                product.getSlug(),
                product.getPrice(),
                product.getDescription(),
                product.getCategory().getName(),
                product.getCategory().getSlug(),
                variantDTOS
        );

    }

    public List<ProductCardDTO> getFeaturedProducts() {
        Pageable limit = PageRequest.of(0,8);
        return productRepository.findFeaturedProducts(limit).getContent();
    }

    public List<ProductCardDTO> getRelatedProducts(String slug) {
        Product product = productRepository.findBySlug(slug).orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        Long categoryId = product.getCategory().getId();

        Pageable limit = PageRequest.of(0,4);
        return productRepository.findRelatedProductsBySlug(categoryId, product.getId(), limit).getContent();
    }
}
