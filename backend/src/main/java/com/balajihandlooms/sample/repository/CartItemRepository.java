package com.balajihandlooms.sample.repository;

import com.balajihandlooms.sample.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByCartIdAndVariantId(UUID cartId, Long variantId);

    @Query("""
        SELECT ci FROM CartItem ci
        JOIN FETCH ci.variant v
        JOIN FETCH v.product
        JOIN FETCH v.images
        WHERE ci.cart.id = :cartId
    """)
    List<CartItem> findByCartIdWithDetails(UUID cartId);

    @Query("""
        SELECT COALESCE(SUM(ci.quantity), 0)
        FROM CartItem ci
        WHERE ci.cart.id = :cartId
    """)
    int getTotalItemsByCartId(UUID cartId);
}
