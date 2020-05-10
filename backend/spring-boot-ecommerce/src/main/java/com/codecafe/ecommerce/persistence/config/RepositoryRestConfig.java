package com.codecafe.ecommerce.persistence.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import com.codecafe.ecommerce.persistence.entity.Product;
import com.codecafe.ecommerce.persistence.entity.ProductCategory;

@Configuration
public class RepositoryRestConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {

        HttpMethod[] unsupportedHttpMethods = { HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE };

        // disable HTTP methods for Products: PUT, POST and DELETE
        config.getExposureConfiguration()
              .forDomainType(Product.class)
              .withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedHttpMethods))
              .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedHttpMethods));

        // disable HTTP methods for ProductCategory: PUT, POST and DELETE
        config.getExposureConfiguration()
              .forDomainType(ProductCategory.class)
              .withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedHttpMethods))
              .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedHttpMethods));
    }

}