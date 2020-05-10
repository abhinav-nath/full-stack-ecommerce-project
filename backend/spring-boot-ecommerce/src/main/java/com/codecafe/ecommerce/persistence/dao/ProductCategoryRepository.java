package com.codecafe.ecommerce.persistence.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.codecafe.ecommerce.persistence.entity.ProductCategory;

@CrossOrigin("http://localhost:4200")
// collectionResourceRel - name of the JSON entry
// path = /product-category
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {

}