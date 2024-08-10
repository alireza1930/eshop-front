import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import {BadgeModule} from "primeng/badge";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'orders-cart-icon',
  templateUrl: './cart-icon.component.html',
  standalone: true,
  imports: [
    BadgeModule,
    RouterLink
  ],
  styles: []
})
export class CartIconComponent implements OnInit {
  cartCount: number | undefined = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartCount = cart?.items?.length ?? 0;
    });
  }
}
