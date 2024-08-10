import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NxWelcomeComponent} from './nx-welcome.component';
import {HeaderComponent} from "./shared/header/header.component";
import {FooterComponent} from "./shared/footer/footer.component";
import {BannerComponent} from "@isc/ui";
import {CartService} from "../../../../orders/src/lib/services/cart.service";
import {MessagesComponent} from "./shared/messages/messages.component";


@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, HeaderComponent, FooterComponent, BannerComponent, MessagesComponent],
  selector: 'isc-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(private cartService: CartService) {
    cartService.initCartLocalStorage();
  }
  title = 'ngshop';
}
