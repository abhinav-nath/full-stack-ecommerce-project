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


  getProduct(productId: number): Observable<Product> {

    // need to build the URL based on the product id
    const productUrl = `${this.baseUrl}/${productId}`

    return this.httpClient.get<Product>(productUrl);
  }


  getProductList(categoryId: number): Observable<Product[]> {

    // need to build the URL based on the category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`

    return this.getProducts(searchUrl);

  }


  getProductListPaginated(page: number, pageSize: number, categoryId: number): Observable<GetResponseProducts> {

    // need to build the URL based on the category id, page and size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}` + `&page=${page}&size=${pageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);

  }


  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );

  }


  searchProducts(searchKeyword: string): Observable<Product[]> {

    // need to build the URL based on the search keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${searchKeyword}`

    return this.getProducts(searchUrl);

  }


  searchProductsPaginated(page: number, pageSize: number, searchKeyword: string): Observable<GetResponseProducts> {

    // need to build the URL based on the search keyword, page and size
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${searchKeyword}&page=${page}&size=${pageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);

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
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}


interface GetResponseProductCategory {
  // unwraps the JSON from Spring Data REST _embedded entry
  _embedded: {
    productCategory: ProductCategory[];
  }
}