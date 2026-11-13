package com.zeciakstore.backend.service;

import com.zeciakstore.backend.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    Product getProductById(Long id);
    List<Product> getProductsByCategory(String category);
    List<Product> getFeaturedProducts();
    List<Product> searchProducts(String query);
    Product createProduct(Product product);
    Product updateProduct(Long id, Product product);
    void deleteProduct(Long id);
}
