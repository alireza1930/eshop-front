import { Component, OnInit } from "@angular/core"
import { CardModule } from "primeng/card"
import { ToolbarModule } from "primeng/toolbar"
import { ButtonModule } from "primeng/button"
import { TableModule } from "primeng/table"
import { Router, RouterModule } from "@angular/router"
import { ToastModule } from "primeng/toast"
import { ConfirmDialogModule } from "primeng/confirmdialog"
import { Product, ProductsService } from "@isc/products"
import { CommonModule } from "@angular/common"

const UX_MODULE = [CardModule, ToolbarModule, ButtonModule, TableModule, RouterModule, ToastModule,
  ConfirmDialogModule, CommonModule]
@Component({
  selector: "isc-products-list",
  standalone: true,
  imports: [UX_MODULE],
  templateUrl: "./products-list.component.html",
  styles: ``
})


export class ProductsListComponent implements OnInit {

  products: Product[] = [];

  constructor(private productsService: ProductsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this._getProducts();
  }

  deleteProduct(id: string) {

  }

  updateProduct(id: string) {
    this.router.navigateByUrl(`products/form/${id}`);
  }

  private _getProducts() {
    this.productsService.getProducts().subscribe(result => {
      this.products = result;
    })
  }
}
