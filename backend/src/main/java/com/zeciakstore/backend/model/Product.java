package com.zeciakstore.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * Entidad Product - Modelo de dominio para productos de ZeciaK Store.
 * Soporta categorías: Damas, Caballeros, Niños y Accesorios.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer stock;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(nullable = false, length = 50)
    private String category; // Damas, Caballeros, Niños, Accesorios

    @Column(name = "is_featured")
    @Builder.Default
    private Boolean featured = false;

    @Column
    private Double rating;

    @Version
    private Long version;

    public Product(Long id, String name, String description, BigDecimal price, Integer stock, String imageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.imageUrl = imageUrl;
        this.category = "Accesorios";
        this.featured = false;
        this.rating = 5.0;
    }
}
