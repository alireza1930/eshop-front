import {Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import {Product} from '../../models/product';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";

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


  constructor(private _cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }


  protected readonly String = String;
}
