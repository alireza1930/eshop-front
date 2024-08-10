import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import {CartService} from "../../../../../../orders/src/lib/services/cart.service";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'ngshop-messages',
  templateUrl: './messages.component.html',
  standalone: true,
  imports: [
    ToastModule
  ],
  styles: []
})
export class MessagesComponent implements OnInit {
  constructor(private cartService: CartService,
              private messageService: MessageService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Cart Updated!'
      });
    });
  }
}
