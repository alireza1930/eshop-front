import { Component, OnInit } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'ngshop-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  imports: [
    RouterLink
  ],
  styles: []
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
