package com.balajihandlooms.sample.controller;

import com.balajihandlooms.sample.dto.ProductCardDTO;
import com.balajihandlooms.sample.dto.ProductDetailsDTO;
import com.balajihandlooms.sample.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping
    public List<ProductCardDTO> getProducts(){
        return productService.getAllProducts();
    }

    @GetMapping("/category/{slug}")
    public List<ProductCardDTO> getCategoryWiseProducts(@PathVariable String slug){
        return productService.getProductsByCategory(slug);
    }

    @GetMapping("/{slug}")
    public ProductDetailsDTO getProductDetails(@PathVariable String slug){
        return productService.getProductDetailsBySlug(slug);
    }

    @GetMapping("/featured")
    public List<ProductCardDTO> getFeaturedProducts(){
        return productService.getFeaturedProducts();
    }

    @GetMapping("/{slug}/related")
    public List<ProductCardDTO> getRelatedProducts(@PathVariable String slug){
        return productService.getRelatedProducts(slug);
    }
}
