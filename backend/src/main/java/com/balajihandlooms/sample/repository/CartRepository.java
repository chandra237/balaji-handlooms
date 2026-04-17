package com.balajihandlooms.sample.repository;

import com.balajihandlooms.sample.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CartRepository extends JpaRepository<Cart, UUID> {
    @Query("""
        SELECT DISTINCT c FROM Cart c
        LEFT JOIN FETCH c.cartItems ci
        LEFT JOIN FETCH ci.variant v
        LEFT JOIN FETCH v.product
        LEFT JOIN FETCH v.images
        WHERE c.id = :cartId
    """)
    Optional<Cart> findCartWithItems(UUID cartId);
}
