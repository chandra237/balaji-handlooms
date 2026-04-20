package com.balajihandlooms.sample.service;

import com.balajihandlooms.sample.dto.AddressRequestDTO;
import com.balajihandlooms.sample.dto.AddressResponseDTO;
import com.balajihandlooms.sample.entity.Address;
import com.balajihandlooms.sample.entity.User;
import com.balajihandlooms.sample.exception.ResourceNotFoundException;
import com.balajihandlooms.sample.repository.AddressRepository;
import com.balajihandlooms.sample.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;

    @Transactional
    public List<AddressResponseDTO> getAddresses(Long userId) {
        return addressRepository.findByUserId(userId)
                .stream()
                .map(a -> new AddressResponseDTO(
                        a.getId(),
                        a.getName(),
                        a.getPhone(),
                        a.getStreet(),
                        a.getCity(),
                        a.getState(),
                        a.getPincode(),
                        a.getIsDefault()
                ))
                .toList();
    }

    @Transactional
    public AddressResponseDTO addAddress(Long userId, AddressRequestDTO requestDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if(Boolean.TRUE.equals(requestDTO.getIsDefault())){
            addressRepository.clearAllDefaultAddresses(userId);
        }

        Address address = new Address();
        address.setName(requestDTO.getName());
        address.setPhone(requestDTO.getPhone());
        address.setStreet(requestDTO.getStreet());
        address.setCity(requestDTO.getCity());
        address.setState(requestDTO.getState());
        address.setPincode(requestDTO.getPincode());
        address.setIsDefault(requestDTO.getIsDefault());
        address.setUser(user);

        addressRepository.save(address);

        return new AddressResponseDTO(
                address.getId(),
                address.getName(),
                address.getPhone(),
                address.getStreet(),
                address.getCity(),
                address.getState(),
                address.getPincode(),
                address.getIsDefault()
        );

    }
}
