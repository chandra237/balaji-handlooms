package com.balajihandlooms.sample.controller;

import com.balajihandlooms.sample.dto.AddressRequestDTO;
import com.balajihandlooms.sample.dto.AddressResponseDTO;
import com.balajihandlooms.sample.entity.User;
import com.balajihandlooms.sample.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/address")
public class AddressController {
    private final AddressService addressService;

    @GetMapping
    public ResponseEntity<List<AddressResponseDTO>> getAddresses(@AuthenticationPrincipal User user){
        if(user == null){
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(addressService.getAddresses(user.getId()));
    }

    @PostMapping
    public ResponseEntity<AddressResponseDTO> addAddress(@RequestBody AddressRequestDTO requestDTO, @AuthenticationPrincipal User user){
        if(user == null){
            return ResponseEntity.status(401).build();
        }
        System.out.println(requestDTO);
        return ResponseEntity.ok(addressService.addAddress(user.getId(), requestDTO));
    }
}
