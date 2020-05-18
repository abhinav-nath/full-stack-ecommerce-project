import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;

  previousKeyword: string = null;

  constructor(private productService: ProductService, private cartService: CartService, private route: ActivatedRoute) { }


  // similar to @PostConstruct of Spring
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.listProducts());
  }


  listProducts() {

    // if url has the "keyword" query parameter that means it is a search mode
    this.searchMode = this.route.snapshot.paramMap.has("keyword");

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }

  }


  handleSearchProducts() {

    const searchKeyword: string = this.route.snapshot.paramMap.get("keyword");

    // if we have different keyword than previous then set the pageNumber to 1
    if(this.previousKeyword != searchKeyword) {
      this.pageNumber = 1;
    }

    this.previousKeyword = searchKeyword;

    console.log(`searchKeyword=${searchKeyword}, pageNumber=${this.pageNumber}`);

    // now search for the products using the searchKeyword
    this.productService.searchProductsPaginated(this.pageNumber - 1, this.pageSize, searchKeyword).subscribe(this.processResult());

  }


  handleListProducts() {
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get("id");
    } else {
      // no category id available .. default to category id 1
      this.currentCategoryId = 1;
    }

    // check if we have a different category id than previous
    // Note : Angular will re-use a component if it is currently being used in the browser

    // if we have a different category id than the previous then set the pageNumber back to 1
    if(this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, pageNumber=${this.pageNumber}`);

    // now get the products for the given category id
    this.productService.getProductListPaginated(this.pageNumber - 1, this.pageSize, this.currentCategoryId).subscribe(this.processResult());

  }


  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1; // Spring Data REST: pages are 0 based - Angular: pages are 1 based
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }


  updatePageSize(updatedPageSize: number) {
    this.pageSize = updatedPageSize;
    this.pageNumber = 1;
    this.listProducts();
  }


  addToCart(product: Product) {

    console.log(`Adding to cart: ${product.name}, ${product.unitPrice}`);

    // do the real work
    const theCartItem = new CartItem(product);
    
    this.cartService.addToCart(theCartItem);
  }

}