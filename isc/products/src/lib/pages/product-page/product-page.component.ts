import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import {CurrencyPipe, NgIf} from "@angular/common";
import {RatingModule} from "primeng/rating";
import {FormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {GalleryComponent} from "../../../../../ui/src/lib/ui/components/gallery/gallery.component";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {CartService} from "../../../../../orders/src/lib/services/cart.service";
import {CartItem} from "../../../../../orders/src/lib/models/cart";

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  standalone: true,
  imports: [
    NgIf,
    RatingModule,
    FormsModule,
    InputNumberModule,
    GalleryComponent,
    CurrencyPipe,
    ButtonModule,
    RippleModule
  ],
  styles: []
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product?: Product;
  endSubs$: Subject<any> = new Subject();
  quantity?: number = 1;

  constructor(private prodService: ProductsService,
              private route: ActivatedRoute,
              private cartService: CartService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params["productid"]) {
        this._getProduct(params["productid"]);
      }
    });
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product?.id,
      quantity: this.quantity
    }
    this.cartService.setCartItem(cartItem);
  }

  private _getProduct(id: string) {
    this.prodService
      .getProduct(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((resProduct) => {
        this.product = resProduct;
      });
  }
}
