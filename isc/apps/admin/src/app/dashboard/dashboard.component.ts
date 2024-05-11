import {Component, OnInit} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CardModule} from "primeng/card";
import {UsersService} from "@isc/users";
import {ProductsService} from "@isc/products";
import {OrdersService} from "@isc/orders";
import {combineLatest} from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  statistics = [];

  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) {
  }

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.ordersService.getTotalSales()
    ]).subscribe((values: any) => {
      this.statistics = values;
    });
  }

}
