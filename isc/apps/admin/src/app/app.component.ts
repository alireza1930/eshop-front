import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NxWelcomeComponent } from './nx-welcome.component'

@Component({
    standalone: true,
    imports: [NxWelcomeComponent, RouterModule],
    selector: 'isc-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'admin'
}
