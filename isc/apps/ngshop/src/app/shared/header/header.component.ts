import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import {NavComponent} from "../nav/nav.component";

@Component({
    selector: 'ngshop-header',
    standalone: true,
    imports: [CommonModule, NavComponent],
    templateUrl: './header.component.html'
})
export class HeaderComponent {}
