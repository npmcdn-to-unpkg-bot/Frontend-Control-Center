import { Component, OnInit, Injectable, Injector, ReflectiveInjector } from '@angular/core';
import { Order, FromAddress, ToAddress, GeoLocation, Location } from '../../management/order/order'
import { NgForm } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'app-single-order-input',
  templateUrl: 'single-order-input.component.html',
  styleUrls: ['single-order-input.component.css'],
  providers: [Order, FromAddress, ToAddress, GeoLocation, Location]
})

export class SingleOrderInputComponent implements OnInit {
  // define explicit injector to inject dependencies used here
  private injector: Injector = ReflectiveInjector.resolveAndCreate([Order, FromAddress, ToAddress, GeoLocation, Location]);

  constructor(public newOrder: Order) {
    this.newOrder.orderType = 1;
  }
  ngOnInit() { }

  submitted = false;
  active = true;
  onSubmit() { 
    // parse order type to number (get string value from select)
    let type = this.newOrder.orderType;
    this.newOrder.orderType = this.toDigit(type);
    this.submitted = true; 
  }

  createNewOrder() {
    // use injector to create a new order
    this.constructor(this.injector.get(Order));
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }

  // TODO: Remove this when we're done
  get diagnostic() { 
    return JSON.stringify(this.newOrder); 
  }

  // helper function
  private toDigit(value: any) {
    if (typeof value === 'string') {
      return parseInt(value);
    } else {
      return value;
    }
  }

  // define order types for dropdown list
  orderTypes = [
    {
      "label": "Document",
      "value": 0
    },
    {
      "label": "Small Parcel",
      "value": 1
    },
    {
      "label": "Medium Parcel",
      "value": 2
    },
    {
      "label": "Large Parcel",
      "value": 3
    }
  ]

}
