package com.balajihandlooms.sample.service;

import com.balajihandlooms.sample.dto.*;
import com.balajihandlooms.sample.entity.Category;
import com.balajihandlooms.sample.entity.Product;
import com.balajihandlooms.sample.entity.ProductVariant;
import com.balajihandlooms.sample.entity.VariantImage;
import com.balajihandlooms.sample.exception.ResourceNotFoundException;
import com.balajihandlooms.sample.repository.CategoryRepository;
import com.balajihandlooms.sample.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@PreAuthorize("hasRole('ADMIN')")
@Service
@RequiredArgsConstructor
public class AdminService {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Transactional
    public void createProduct(ProductRequestDTO dto){
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Product product = new Product();
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setSlug(dto.getSlug());
        product.setDescription(dto.getDescription());
        product.setCategory(category);
        product.setFeatured(dto.getFeatured());

        Set<ProductVariant> variants = dto.getVariants().stream().map(v -> {
            ProductVariant variant = new ProductVariant();

            variant.setColor(v.getColor());
            variant.setStock(v.getStock());
            variant.setSku(v.getSku());
            variant.setPrice(v.getPrice());
            variant.setActive(v.getActive());
            variant.setLowStockThreshold(v.getLowStockThreshold());
            variant.setIsDefault(v.getIsDefault());
            variant.setProduct(product);

            List<VariantImage> images = v.getImages().stream().map(img -> {
                VariantImage image = new VariantImage();
                image.setImageUrl(img.getImageUrl());
                image.setIsPrimary(img.getIsPrimary());
                image.setPosition(img.getPosition());
                image.setVariant(variant);
                return image;
            }).toList();

            variant.setImages(images);

            return variant;
        }).collect(Collectors.toSet());

        product.setVariants(variants);

        productRepository.save(product);
    }

    @Transactional(readOnly = true)
    public List<AdminProductListDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(product -> new AdminProductListDTO(
                        product.getId(),
                        product.getName(),
                        product.getCategory().getName(),
                        product.getPrice(),
                        product.getFeatured(),
                        product.getVariants().size()
                )).toList();
    }

    @Transactional
    public void updateProduct(ProductRequestDTO dto, Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found to update"));

        product.setId(dto.getId());
        product.setName(dto.getName());
        product.setSlug(dto.getSlug());
        product.setPrice(dto.getPrice());
        product.setDescription(dto.getDescription());
        product.setFeatured(dto.getFeatured());

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        product.setCategory(category);

        product.getVariants().clear();

        for (ProductVariantRequestDTO v : dto.getVariants()) {
            ProductVariant variant = new ProductVariant();
            variant.setId(v.getId());
            variant.setColor(v.getColor());
            variant.setSku(v.getSku());
            variant.setPrice(v.getPrice());
            variant.setStock(v.getStock());
            variant.setActive(v.getActive());
            variant.setLowStockThreshold(v.getLowStockThreshold());
            variant.setIsDefault(v.getIsDefault());
            variant.setProduct(product);

            List<VariantImage> images = new ArrayList<>();
            for (VariantImageRequestDTO img : v.getImages()) {
                VariantImage vi = new VariantImage();
                vi.setId(img.getId());
                vi.setImageUrl(img.getImageUrl());
                vi.setIsPrimary(img.getIsPrimary());
                vi.setPosition(img.getPosition());
                vi.setVariant(variant);
                images.add(vi);
            }
            variant.setImages(images);

            product.getVariants().add(variant);
        }

        productRepository.save(product);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        productRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public ProductResponseDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        return mapToDTO(product);
    }

    @Transactional(readOnly = true)
    private ProductResponseDTO mapToDTO(Product product) {
        ProductResponseDTO dto = new ProductResponseDTO();

        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setFeatured(product.getFeatured());
        dto.setSlug(product.getSlug());
        dto.setCategoryId(product.getCategory().getId());
        dto.setCategoryName(product.getCategory().getName());

        Set<ProductVariantResponseDTO> variants = product.getVariants().stream()
                .map(variant -> {
                    ProductVariantResponseDTO v = new ProductVariantResponseDTO();

                    v.setId(variant.getId());
                    v.setColor(variant.getColor());
                    v.setSku(variant.getSku());
                    v.setStock(variant.getStock());
                    v.setPrice(variant.getPrice());
                    v.setActive(variant.getActive());
                    v.setIsDefault(variant.getIsDefault());
                    v.setLowStockThreshold(variant.getLowStockThreshold());

                    List<VariantImageResponseDTO> images = variant.getImages().stream()
                            .map(img -> {
                                VariantImageResponseDTO i = new VariantImageResponseDTO();
                                i.setId(img.getId());
                                i.setImageUrl(img.getImageUrl());
                                i.setPosition(img.getPosition());
                                i.setIsPrimary(img.getIsPrimary());

                                return i;
                            }).toList();

                    v.setImages(images);

                    return v;
                }).collect(Collectors.toSet());

        dto.setVariants(variants);

        return dto;
    }
}
