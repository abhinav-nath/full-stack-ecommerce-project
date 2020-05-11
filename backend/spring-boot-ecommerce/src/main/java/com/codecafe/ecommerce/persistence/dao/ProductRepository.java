package com.codecafe.ecommerce.persistence.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.codecafe.ecommerce.persistence.entity.Product;

@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // Spring Data REST automatically exposes endpoint - http://host:port/api/products/search/findByCategoryId?id=:id
    
    // SELECT * FROM product WHERE category_id = ?
    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);

}