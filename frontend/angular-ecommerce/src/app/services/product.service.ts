import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../model/product';
import { ProductCategory } from '../model/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8090/api/products";

  private categoryUrl = "http://localhost:8090/api/product-category";


  // httpClient will be injected automatically by Angular's dependency injection
  constructor(private httpClient: HttpClient) { }


  getProductList(categoryId: number): Observable<Product[]> {

    // need to build URL based on the category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`

    return this.getProducts(searchUrl);

  }


  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );

  }


  searchProducts(searchKeyword: string): Observable<Product[]> {

    // need to build URL based on the search keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${searchKeyword}`

    return this.getProducts(searchUrl);

  }


  private getProducts(searchUrl: string): Observable<Product[]> {

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );

  }

}


interface GetResponseProducts {
  // unwraps the JSON from Spring Data REST _embedded entry
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategory {
  // unwraps the JSON from Spring Data REST _embedded entry
  _embedded: {
    productCategory: ProductCategory[];
  }
}