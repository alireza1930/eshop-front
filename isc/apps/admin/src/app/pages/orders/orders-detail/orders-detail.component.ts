import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';
import {Order, OrdersService} from "@isc/orders";
import {ToastModule} from "primeng/toast";
import {CardModule} from "primeng/card";
import {FieldsetModule} from "primeng/fieldset";
import {CommonModule, CurrencyPipe, DatePipe} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'admin-orders-detail',
  standalone: true,
  imports: [
    ToastModule,
    CardModule,
    FieldsetModule,
    DatePipe,
    DropdownModule,
    FormsModule,
    CurrencyPipe,
    CommonModule
  ],
  templateUrl: './orders-detail.component.html',
  styles: []
})
export class OrdersDetailComponent implements OnInit {
  order?: Order;
  orderStatuses: any = [];
  selectedStatus: any;

  constructor(
    private orderService: OrdersService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      };
    });
  }

  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.orderService.getOrder(params.id).subscribe((order) => {
          this.order = order;
          this.selectedStatus = order.status;
        });
      }
    });
  }

  onStatusChange(event: any) {
    this.orderService.updateOrder({ status: event.value }, this.order?.id).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Order is updated!'
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Order is not updated!'
        });
      }
    );
  }
}
