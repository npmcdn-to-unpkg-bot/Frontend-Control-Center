import { Component, OnInit } from '@angular/core';
import { Order, Driver } from '../shared/index';
import { OrderService } from '../shared/order-service/order.service';
import { DriverService } from '../shared/driver-service/driver.service';


@Component({
  moduleId: module.id,
  selector: 'app-assign-order',
  templateUrl: 'assign-order.component.html',
  styleUrls: ['assign-order.component.css'],
  providers: [OrderService, DriverService]
})
export class AssignOrderComponent implements OnInit {

  constructor(private orderService: OrderService, private driverService: DriverService) { }

  ngOnInit() {
    this.getOrderDriverLists();
  }

  orderList: Order[];
  driverList: Driver[];
  selectedOrders: Order[] = []; // multiple selections for order
  selectedDriver: Driver;  // single selection for diver
  orderDriverPairs: { order: Order, driver: Driver }[] = [];
  submitted: boolean = false;
  active: boolean = true;
  orderErrorMessage: any;
  driverErrorMessage: any;

  // Add selected orders and driver to orderDriverPairs, then remove orders from orderList
  addPairs() {
    this.selectedOrders.forEach(selectedOrder => {
      var pair = {
        order: selectedOrder,
        driver: this.selectedDriver
      };
      this.orderDriverPairs.push(pair);
      this.removeListItem(selectedOrder, this.orderList);
    })
    this.selectedOrders = [];
  }

  // remove pair from orderDriverPairs, then add this order back to orderList
  removePair(thisPair: { order: Order, driver: Driver }) {
    this.removeListItem(thisPair, this.orderDriverPairs);
    this.orderList.unshift(thisPair.order);
  }

  // TODO: filter orderlist based on search key words
  filterOrders(keyword: string) {

  }

  // TODO: filter driverlist based on search key words
  filterDrivers(keyword: string) {

  }

  // call orderService to submit orderDriverPairs
  onSubmit() {
    this.orderService.assignOrdersToDriver(this.orderDriverPairs);
    this.submitted = true;
    setTimeout(() => { this.submitted = false, 0 });
    // clear attributes
    this.selectedDriver = undefined;
    this.selectedOrders = [];
    this.orderDriverPairs = [];
  }

  onCheckboxChange(order: Order, checked: boolean) {
    if (!checked) {
      this.removeListItem(order, this.selectedOrders)
    } else {
      this.selectedOrders.push(order);
    }
  }

  onRadioChange(driver: Driver, checked: boolean) {
    this.selectedDriver = checked ? driver : undefined;
  }

  private removeListItem(item: any, list: any[]) {
    var index = list.indexOf(item);
    if (index > -1) list.splice(index, 1);
  }

  private getOrderDriverLists() {
    // Get all assignable orders
    this.orderService.getOrders().subscribe(
      orders => {
        this.orderList = orders;
        this.orderList = this.orderList.filter((item) => item.status === 0);
      },
      error => this.orderErrorMessage = <any>error
    );
    this.driverService.getDrivers().subscribe(
      drivers => this.driverList = drivers,
      error => this.driverErrorMessage = <any>error
    );
  }

}
