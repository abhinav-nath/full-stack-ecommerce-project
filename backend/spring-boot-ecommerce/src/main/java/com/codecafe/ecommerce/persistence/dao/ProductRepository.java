package com.codecafe.ecommerce.persistence.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.codecafe.ecommerce.persistence.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}