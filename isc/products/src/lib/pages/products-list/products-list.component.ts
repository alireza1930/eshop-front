import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import {ProductItemComponent} from "../../components/product-item/product-item.component";
import {CategoriesService, Category, Product, ProductsService} from "@isc/products";

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  standalone: true,
  imports: [
    NgIf,
    CheckboxModule,
    FormsModule,
    NgClass,
    NgForOf,
    ProductItemComponent
  ],
  styles: []
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  isCategoryPage?: boolean;

  constructor(
    private prodService: ProductsService,
    private catService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params["categoryid"]? this._getProducts([params["categoryid"]]) : this._getProducts();
      params["categoryid"] ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
    });
    this._getCategories();
  }

  private _getProducts(categoriesFilter?: (string | undefined)[]) {
    this.prodService.getProducts(categoriesFilter).subscribe((resProducts) => {
      this.products = resProducts;
    });
  }

  private _getCategories() {
    this.catService.getCategories().subscribe((resCats) => {
      this.categories = resCats;
    });
  }

  categoryFilter() {
    const selectedCategories = this.categories
      .filter((category) => category.checked)
      .map((category) => category._id);

    this._getProducts(selectedCategories);
  }
}
