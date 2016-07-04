import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service'
import { Order } from './order';

@Component({
  moduleId: module.id,
  selector: 'app-order',
  templateUrl: 'order.component.html',
  styleUrls: ['order.component.css'],
  providers: [OrderService],
})
export class OrderComponent implements OnInit {
  errorMessage: string;
  orders: Order[];
  mode = 'Observable';

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe(
      orders => this.orders = orders,
      error => this.errorMessage = <any>error
    );
  }

}
