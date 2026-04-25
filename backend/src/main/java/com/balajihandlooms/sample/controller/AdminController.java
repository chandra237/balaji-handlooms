package com.balajihandlooms.sample.controller;

import com.balajihandlooms.sample.dto.AdminProductListDTO;
import com.balajihandlooms.sample.dto.ProductRequestDTO;
import com.balajihandlooms.sample.dto.ProductResponseDTO;
import com.balajihandlooms.sample.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@PreAuthorize("hasRole('ADMIN')")
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/products")
    public ResponseEntity<Map<String, String>> createProduct(@RequestBody ProductRequestDTO productRequestDTO){
        adminService.createProduct(productRequestDTO);
        return ResponseEntity.ok(Map.of(
                "message","Product Added successfully"
        ));
    }

    @GetMapping("/products")
    public ResponseEntity<List<AdminProductListDTO>> getAllProducts(){
        return ResponseEntity.ok(adminService.getAllProducts());
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable Long id){
        return ResponseEntity.ok(adminService.getProductById(id));
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<Map<String, String>> updateProduct(@RequestBody ProductRequestDTO productRequestDTO, @PathVariable Long id){
        adminService.updateProduct(productRequestDTO, id);
        return ResponseEntity.ok(Map.of(
                "message","Product Updated successfully"
        ));
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Map<String, String>> deleteProduct(@PathVariable Long id){
        adminService.deleteProduct(id);
        return ResponseEntity.ok(Map.of(
                "message","Product Deleted successfully"
        ));
    }
}
