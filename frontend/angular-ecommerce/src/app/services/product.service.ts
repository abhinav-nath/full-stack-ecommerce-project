import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8090/api/products";

  // httpClient will be injected automatically by Angular's dependency injection
  constructor(private httpClient: HttpClient) { }

  getProductList(categoryId: number): Observable<Product[]> {

    // need to build URL based on the category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

}


interface GetResponse {
  // unwraps the JSON from Spring Data REST _embedded entry
  _embedded: {
    products: Product[];
  }
}