package com.codecafe.ecommerce.persistence.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.codecafe.ecommerce.persistence.entity.ProductCategory;

// collectionResourceRel - name of the JSON entry
// path = /product-category
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {

}