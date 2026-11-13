package com.zeciakstore.backend.repository;

import com.zeciakstore.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio DAO para la entidad Product.
 * Implementa consultas CRUD y personalizadas mediante Spring Data JPA e Hibernate.
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategoryIgnoreCase(String category);

    List<Product> findByFeaturedTrue();

    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findByCategoryIgnoreCaseAndNameContainingIgnoreCase(String category, String name);
}
