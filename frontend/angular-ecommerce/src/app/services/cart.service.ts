import { Injectable } from '@angular/core';
import { CartItem } from '../model/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  // Subject is a subclass of Observable. We can use Subject to publish events. The event will be sent to all of the subscribers.
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();


  constructor() { }


  addToCart(theCartItem: CartItem) {

    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {

      // find the item in the cart based on the item id
      existingCartItem = this.cartItems.find(cartItem => cartItem.id === theCartItem.id);

      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);

    }

    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem.quantity++;
    } else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();

  }


  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values, all subscribers will receive the new data

    // this will publish two events to all subscribers
    // one event for totalPrice, one event for totalQuantity
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log the cart data for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }


  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log("Contents of the cart");
    for (let cartItem of this.cartItems) {
      const subTotalPrice = cartItem.quantity * cartItem.unitPrice;
      console.log(`name: ${cartItem.name}, quantity: ${cartItem.quantity}, unitPrice: ${cartItem.unitPrice}, subTotalPrice: ${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log("----");
  }


  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;

    if(cartItem.quantity === 0) {
      this.remove(cartItem);
    } else {
      this.computeCartTotals();
    }

  }


  remove(cartItem: CartItem) {
    
    // get index of the item in the array
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === cartItem.id);

    // if found, remove the item from the array at the given index
    if(itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }

  }

}