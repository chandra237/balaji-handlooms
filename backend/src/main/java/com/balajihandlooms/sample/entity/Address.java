package com.balajihandlooms.sample.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String phone;

    private String street;
    private String city;
    private String state;
    private String pincode;

    private Boolean isDefault;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
