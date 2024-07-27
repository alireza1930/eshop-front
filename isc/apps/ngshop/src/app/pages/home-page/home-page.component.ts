import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonModule } from 'primeng/button'
import { AccordionModule } from 'primeng/accordion'
import { PanelModule } from 'primeng/panel'
import { FormsModule } from '@angular/forms'
import {BannerComponent} from "@isc/ui";
import {
  CategoriesBannerComponent
} from "../../../../../../products/src/lib/components/categories-banner/categories-banner.component";
import {
  FeaturedProductsComponent
} from "../../../../../../products/src/lib/components/featured-products/featured-products.component";


@Component({
  selector: 'eshop-home-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, AccordionModule, PanelModule, FormsModule, BannerComponent, CategoriesBannerComponent, FeaturedProductsComponent],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
}
