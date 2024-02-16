import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonModule } from 'primeng/button'
import { AccordionModule } from 'primeng/accordion'



@Component({
    selector: 'eshop-home-page',
    standalone: true,
    imports: [CommonModule, ButtonModule, AccordionModule],
    templateUrl: './home-page.component.html'
})
export class HomePageComponent {
}
