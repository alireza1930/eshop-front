import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";

@Component({

  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ui-banner',
  standalone: true,
  imports: [
    ButtonModule
  ],
  templateUrl: './banner.component.html'
})
export class BannerComponent {

}
