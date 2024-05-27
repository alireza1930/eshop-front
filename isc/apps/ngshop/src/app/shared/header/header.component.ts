import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import {NavComponent} from "../nav/nav.component";
import {
  ProductsSearchComponent
} from "../../../../../../products/src/lib/components/products-search/products-search.component";

@Component({
    selector: 'ngshop-header',
    standalone: true,
  imports: [CommonModule, NavComponent, ProductsSearchComponent],
    templateUrl: './header.component.html'
})
export class HeaderComponent {}
