import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import {CurrencyPipe} from "@angular/common";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'orders-order-summary',
  templateUrl: './order-summary.component.html',
  standalone: true,
  imports: [
    CurrencyPipe,
    ButtonModule
  ],
  styles: []
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  endSubs$: Subject<any> = new Subject();
  totalPrice!: number;
  isCheckout = false;
  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {
    this.router.url.includes('checkout') ? (this.isCheckout = true) : (this.isCheckout = false);
  }

  ngOnInit(): void {
    this._getOrderSummary();
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  _getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items.map((item) => {
          this.ordersService
            .getProduct(item.productId!)
            .pipe(take(1))
            .subscribe((product) => {
              this.totalPrice += product.price * item.quantity!;
            });
        });
      }
    });
  }

  navigateToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
