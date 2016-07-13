import { Component, OnInit, Injectable, Injector, ReflectiveInjector } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import { Order, Address, FromAddress, ToAddress, GeoLocation, Location } from '../../shared/order-service/order'
import { NgForm } from '@angular/common';
import { MapService } from '../../shared/location-service/map.service';
import { OrderService } from '../../shared/order-service/order.service';

@Component({
  moduleId: module.id,
  selector: 'app-single-order-input',
  templateUrl: 'single-order-input.component.html',
  styleUrls: ['single-order-input.component.css'],
  providers: [Order, FromAddress, ToAddress, GeoLocation, Location, MapService, OrderService]
})

export class SingleOrderInputComponent implements OnInit {
  // define explicit injector to inject dependencies used in the class
  private injector: Injector = ReflectiveInjector.resolveAndCreate([Order, FromAddress, ToAddress, GeoLocation, Location]);

  constructor(public newOrder: Order, private mapService: MapService, private orderService: OrderService) {
    this.newOrder.orderType = 1;
  }
  ngOnInit() { }

  submitted = false;
  active = true;

  onSubmit() {
    // parse order type to number (get string value from select)
    let type = this.newOrder.orderType;
    this.newOrder.orderType = parseInt(type+'');
    this.orderService.createOrder(this.newOrder);    
    this.submitted = true;
    setTimeout(() => this.submitted = false, 1000);
    this.createNewOrder();
  }

  streetAutoComplete(id: string) {
    this.mapService.streetAutoComplete(id, callback => {
      // callback for address geocoding
      if (callback.code === 200) {
        var address = new Address(new GeoLocation())
        address.geoLocation.lat = callback.geolocation.lat;
        address.geoLocation.lng = callback.geolocation.lng;
        address.postal = callback.postal;
        switch (id) {
          case 'fromStreet':
            address.street = this.newOrder.fromAddress.street;
            this.newOrder.fromAddress = address;
            this.newOrder.location.coordinates = [address.geoLocation.lng, address.geoLocation.lat];
            this.newOrder.location.type = 'Point'; break;
          case 'toStreet':
            address.street = this.newOrder.toAddress.street;
            this.newOrder.toAddress = address; break;
          default:
        }
      }
    });
  }

  geocodingByPostal(id: string, postal: number) {
    this.mapService.getGeoDataForPostalCode(postal, (callback) => {
      if (callback.code === 200) {
        var address = new Address(new GeoLocation())
        address.geoLocation.lat = callback.geolocation.lat;
        address.geoLocation.lng = callback.geolocation.lng;
        address.street = callback.address;
        address.postal = postal;
        switch (id) {
          case 'fromPostal':
            this.newOrder.fromAddress = address;
            this.newOrder.location.coordinates = [address.geoLocation.lng, address.geoLocation.lat];
            this.newOrder.location.type = 'Point'; break;
          case 'toPostal': this.newOrder.toAddress = address; break;
          default:
        }
      }
    })
  }

  createNewOrder() {
    // use injector to create a new order
    this.constructor(this.injector.get(Order));
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }

  // define order types for dropdown list
  orderTypes = [
    { "label": "Document", "value": 0 }, { "label": "Small Parcel", "value": 1 },
    { "label": "Medium Parcel", "value": 2 }, { "label": "Large Parcel", "value": 3 }]

}
