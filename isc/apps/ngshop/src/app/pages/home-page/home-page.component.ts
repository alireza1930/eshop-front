import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonModule } from 'primeng/button'
import { AccordionModule } from 'primeng/accordion'
import { PanelModule } from 'primeng/panel'
import { FormsModule } from '@angular/forms'
import {BannerComponent} from "@isc/ui";


@Component({
  selector: 'eshop-home-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, AccordionModule, PanelModule, FormsModule, BannerComponent],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
}
