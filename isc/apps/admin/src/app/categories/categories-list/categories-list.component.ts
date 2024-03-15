import { Component, OnInit } from "@angular/core"
import { CardModule } from "primeng/card"
import { ToolbarModule } from "primeng/toolbar"
import { ButtonModule } from "primeng/button"
import { TableModule } from "primeng/table"
import { CategoriesService } from "@isc/products"
import { Category } from "@isc/products"
import { RouterModule } from "@angular/router"
import { ConfirmationService, MessageService } from "primeng/api"
import { ToastModule } from "primeng/toast"
import { ConfirmDialogModule } from "primeng/confirmdialog"

const UX_MODULE = [CardModule, ToolbarModule, ButtonModule, TableModule, RouterModule, ToastModule, ConfirmDialogModule]

@Component({
  selector: "isc-categories-list",
  standalone: true,
  imports: [UX_MODULE],
  templateUrl: "./categories-list.component.html",
  styles: ``
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = []

  constructor(private categoriesService: CategoriesService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this._getCategories()
  }

  deleteCategory(categoryId: string) {

    this.confirmationService.confirm({
      message: "Do you want to Delete this Category?",
      header: "Delete Category",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe(
          () => {
            this._getCategories()
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Category is deleted!"
            })
          },
          () => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Category is not deleted!"
            })
          }
        )
      }
    })
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe(cats => {
      this.categories = cats;
    })
  }
}
