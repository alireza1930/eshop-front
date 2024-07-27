import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import {NgIf} from "@angular/common";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  standalone: true,
  imports: [
    NgIf,
    ButtonModule
  ],
  styles: []
})
export class ProductItemComponent implements OnInit {
  @Input() product?: Product;

  constructor() {}

  ngOnInit(): void {}
}
