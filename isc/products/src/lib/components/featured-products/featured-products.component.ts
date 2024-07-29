import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import {ProductItemComponent} from "../product-item/product-item.component";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  standalone: true,
  imports: [
    ProductItemComponent,
    NgForOf,
    KeyValuePipe,
    NgIf
  ],
  styles: []
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
  featuredProducts: Product[] = [];
  endSubs$: Subject<any> = new Subject();

  constructor(private prodService: ProductsService) {}

  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getFeaturedProducts() {
    this.prodService
      .getFeaturedProducts(4)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((res: any) => {
        this.featuredProducts = res?.products;
      });
  }
}
