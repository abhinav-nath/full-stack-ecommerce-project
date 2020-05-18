import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0.00;
  totalQuantity: number = 0;


  constructor(private cartService: CartService) { }


  ngOnInit(): void {
    this.listCartDetails();
  }


  listCartDetails() {

    // get a handle to to the cart items
    this.cartItems = this.cartService.cartItems;

    // subscribe to the cart totalPrice event
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe to the cart totalQuantity event
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    // compute cart total price and quantity
    this.cartService.computeCartTotals();

  }


  incrementQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
  }


  decrementQuantity(cartItem: CartItem) {
    this.cartService.decrementQuantity(cartItem);
  }


  remove(cartItem: CartItem) {
    this.cartService.remove(cartItem);
  }

}