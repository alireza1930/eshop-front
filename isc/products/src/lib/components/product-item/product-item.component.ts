import {Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import {Product} from '../../models/product';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";
import {CartService} from "../../../../../orders/src/lib/services/cart.service";
import {CartItem} from "../../../../../orders/src/lib/models/cart";

@Component({
    selector: 'products-product-item',
    templateUrl: './product-item.component.html',
    standalone: true,
    imports: [
        NgIf,
        ButtonModule,
        RouterLink,
        NgOptimizedImage
    ],
    styles: []
})
export class ProductItemComponent implements OnInit {
    @Input() product?: Product;


    constructor(private _cd: ChangeDetectorRef,
                private cartService: CartService) {
    }

    ngOnInit(): void {
    }


    protected readonly String = String;

    addProductToCart() {
        const cartItem: CartItem = {
            productId: this.product?.id,
            quantity: 1
        };

        this.cartService.setCartItem(cartItem, false);
    }
}
