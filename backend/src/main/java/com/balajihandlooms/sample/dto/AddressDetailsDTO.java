package com.balajihandlooms.sample.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressDetailsDTO {
    private String name;
    private String phone;
    private String street;
    private String city;
    private String state;
    private String pincode;
}
