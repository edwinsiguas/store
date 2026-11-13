package com.zeciakstore.backend.repository;

import com.zeciakstore.backend.model.TouristAttraction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TouristAttractionRepository extends JpaRepository<TouristAttraction, Long> {
}
