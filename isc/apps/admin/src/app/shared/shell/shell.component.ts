import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component'
import { Router, RouterModule } from '@angular/router'

@Component({
  selector: 'admin-shell',
  standalone: true,
  imports: [RouterModule, SidebarComponent],
  templateUrl: './shell.component.html'
})
export class ShellComponent {

}
