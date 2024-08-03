import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NxWelcomeComponent} from './nx-welcome.component';
import {HeaderComponent} from "./shared/header/header.component";
import {FooterComponent} from "./shared/footer/footer.component";
import {BannerComponent} from "@isc/ui";
import {CartService} from "../../../../orders/src/lib/services/cart.service";


@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, HeaderComponent, FooterComponent, BannerComponent],
  selector: 'isc-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(private cartService: CartService) {
    cartService.initCartLocalStorage();
  }
  title = 'ngshop';
}
