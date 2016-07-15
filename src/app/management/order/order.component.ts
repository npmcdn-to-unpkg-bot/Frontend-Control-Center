import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/order-service/order.service'
import { Order } from '../../shared/order-service/order';
import { DataTable, Column } from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'app-order',
  templateUrl: 'order.component.html',
  styleUrls: ['order.component.css'],
  directives: [DataTable, Column],
  providers: [OrderService],
})
export class OrderComponent implements OnInit {
  errorMessage: string;
  orders: Order[];
  mode = 'Observable';
  cols: any[];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getOrders();
    this.createOrderTable();
  }

  private createOrderTable() {
    this.cols = [
      { header: 'Order No.', field: 'orderId' },
      { header: 'Assigned Driver', field: 'deliver_by' },
      { header: 'Status', field: 'status' },
      { header: 'Fare', field: 'amount' },   
      { header: 'Paid', field: 'paid' },   
      { header: 'Released', field: 'released_to_driver' }, 
      { header: 'Last Change', field: 'updated_at' },           
      // { header: 'Type', field: 'orderType' },         
      // { header: 'Sender', field: 'contactName' },
      // { header: 'Sender Contact', field: 'contactNumber' },
      // { header: 'Recipient', field: 'recipientName' },
      // { header: 'Recipient Contact', field: 'recipientContact' },
      // { header: 'From', field: 'fromAddress.street' },
      // { header: 'To', field: 'toAddress.street' },
      // { header: 'Remarks', field: 'comments' }
    ];
  }

  private getOrders() {
    this.orderService.getOrders().subscribe(
      orders => this.orders = orders,
      error => this.errorMessage = <any>error
    );
  }

}
