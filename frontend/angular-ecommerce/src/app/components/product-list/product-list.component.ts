import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;
  searchMode: boolean;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }


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

    // now search for the products using the searchKeyword
    this.productService.searchProducts(searchKeyword).subscribe( data => this.products = data );

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

    // now get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;  // assign results to the product array
      }
    );
  }

}