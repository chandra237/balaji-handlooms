package com.balajihandlooms.sample.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressRequestDTO {
    private String name;
    private String phone;

    private String street;
    private String city;
    private String state;
    private String pincode;
    private Boolean isDefault;
}
