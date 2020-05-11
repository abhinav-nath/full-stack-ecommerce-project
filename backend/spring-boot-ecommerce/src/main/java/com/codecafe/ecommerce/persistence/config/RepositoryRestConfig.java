package com.codecafe.ecommerce.persistence.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import com.codecafe.ecommerce.persistence.entity.Product;
import com.codecafe.ecommerce.persistence.entity.ProductCategory;

@Configuration
public class RepositoryRestConfig implements RepositoryRestConfigurer {
    
    private EntityManager entityManager;
    
    // constructor injection - JPA Entity Manager
    @Autowired
    public RepositoryRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
    
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
        
        // call an internal helper method
        exposeIds(config);
    }


    // entity ids (category ids) will be available in /api/product-category endpoint
    private void exposeIds(RepositoryRestConfiguration config) {
        // expose entity ids

        // get a list of all entity classes from the entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // create a list of the entity types
        List<Class> entityClasses = new ArrayList<>();

        // get the entity types of the entities
        for(EntityType entityType : entities) {
            entityClasses.add(entityType.getJavaType());
        }

        // expose the entity ids for the array of entity/domain types
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);

    }

}