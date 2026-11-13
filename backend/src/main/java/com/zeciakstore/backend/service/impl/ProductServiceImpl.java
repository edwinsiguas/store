package com.zeciakstore.backend.service.impl;

import com.zeciakstore.backend.model.Product;
import com.zeciakstore.backend.repository.ProductRepository;
import com.zeciakstore.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Product> getProductsByCategory(String category) {
        if (category == null || category.equalsIgnoreCase("todos")) {
            return productRepository.findAll();
        }
        return productRepository.findByCategoryIgnoreCase(category);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Product> getFeaturedProducts() {
        return productRepository.findByFeaturedTrue();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Product> searchProducts(String query) {
        if (query == null || query.trim().isEmpty()) {
            return productRepository.findAll();
        }
        return productRepository.findByNameContainingIgnoreCase(query.trim());
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long id, Product productDetails) {
        Product product = getProductById(id);
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setStock(productDetails.getStock());
        product.setImageUrl(productDetails.getImageUrl());
        product.setCategory(productDetails.getCategory());
        if (productDetails.getFeatured() != null) {
            product.setFeatured(productDetails.getFeatured());
        }
        if (productDetails.getRating() != null) {
            product.setRating(productDetails.getRating());
        }
        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }
}
