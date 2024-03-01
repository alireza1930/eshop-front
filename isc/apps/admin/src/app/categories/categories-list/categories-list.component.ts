import { Component } from '@angular/core';
import { CardModule } from 'primeng/card'
import { ToolbarModule } from "primeng/toolbar"
import { ButtonModule } from "primeng/button"
import { TableModule } from "primeng/table"

const UX_MODULE = [CardModule, ToolbarModule, ButtonModule, TableModule]

@Component({
  selector: 'isc-categories-list',
  standalone: true,
  imports: [UX_MODULE],
  templateUrl: './categories-list.component.html',
  styles: ``
})
export class CategoriesListComponent {

  categories = [
    {
      id: 1,
      name: "category1",
      icon: "icon1"
    },
    {
      id: 2,
      name: "category2",
      icon: "icon2"
    },
    {
      id: 3,
      name: "category3",
      icon: "icon3"
    }
  ]

}
