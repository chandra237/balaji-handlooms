package com.balajihandlooms.sample.repository;

import com.balajihandlooms.sample.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("""
        SELECT o FROM Order o
        WHERE o.user.id = :userId
        ORDER BY o.createdAt DESC
    """)
    List<Order> findByUserIdOrderByCreatedAt(Long userId);
}
