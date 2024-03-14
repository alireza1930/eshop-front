import { Component, OnInit } from "@angular/core"
import { CardModule } from 'primeng/card'
import { ToolbarModule } from "primeng/toolbar"
import { ButtonModule } from "primeng/button"
import { TableModule } from "primeng/table"
import { CategoriesService } from "@isc/products"
import { Category } from "@isc/products"

const UX_MODULE = [CardModule, ToolbarModule, ButtonModule, TableModule]

@Component({
  selector: 'isc-categories-list',
  standalone: true,
  imports: [UX_MODULE],
  templateUrl: './categories-list.component.html',
  styles: ``
})
export class CategoriesListComponent implements OnInit{
  categories : Category[] =[];

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(cats => {
      this.categories = cats;
    })
  }


}
