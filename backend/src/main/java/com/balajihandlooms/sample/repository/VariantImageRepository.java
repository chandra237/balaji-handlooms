package com.balajihandlooms.sample.repository;

import com.balajihandlooms.sample.entity.VariantImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VariantImageRepository extends JpaRepository<VariantImage, Long> {

    List<VariantImage> findByVariantId(Long variantId);

//    Optional<VariantImage> findByVariantIdAndIsPrimaryTrue(Long variantId);

}
