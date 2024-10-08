import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CartItemDetailed} from '../../models/cart';
import {CartService} from '../../services/cart.service';
import {OrdersService} from '../../services/orders.service';
import {ButtonModule} from "primeng/button";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {ProductsService} from "@isc/products";
import {OrderSummaryComponent} from "../../components/order-summary/order-summary.component";

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  standalone: true,
  imports: [
    ButtonModule,
    InputNumberModule,
    FormsModule,
    CurrencyPipe,
    NgForOf,
    OrderSummaryComponent
  ],
  styles: []
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartItemsDetailed: CartItemDetailed[] = [];
  cartCount = 0;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService,
    private productsService: ProductsService,
  ) {
  }

  ngOnInit(): void {
    this._getCartDetails();
  }

  ngOnDestroy() {
    // @ts-ignore
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((respCart) => {
      this.cartItemsDetailed = [];
      this.cartCount = respCart?.items.length ?? 0;
      respCart.items.forEach((cartItem) => {
        this.ordersService.getProduct(cartItem.productId!).subscribe((respProduct) => {
          this.cartItemsDetailed.push({
            product: respProduct,
            quantity: cartItem.quantity
          });
        });
      });
    });
  }

  backToShop() {
    this.router.navigate(['/products']);
  }

  deleteCartItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id);
  }

  updateCartItemQuantity(event: any, cartItem: CartItemDetailed) {
    this.cartService.setCartItem(
      {
        productId: cartItem.product.id,
        quantity: event.value
      },
      true
    );
  }
}
