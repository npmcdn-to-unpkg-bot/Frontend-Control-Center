import { Component, OnInit } from '@angular/core';
import { FileService } from '../../shared/file-service/file.service';
import { MapService } from '../../shared/location-service/map.service';
import { OrderService } from '../../shared/order-service/order.service';
import { Order, Address, GeoLocation, Location } from '../../shared/order-service/order'


@Component({
  moduleId: module.id,
  selector: 'app-batch-order-upload',
  templateUrl: 'batch-order-upload.component.html',
  styleUrls: ['batch-order-upload.component.css'],
  providers: [FileService, MapService, OrderService]
})
export class BatchOrderUploadComponent implements OnInit {

  constructor(private fileService: FileService, private mapService: MapService, private orderService: OrderService) { }
  ngOnInit() {
  }

  orders: Order[];
  faultyEntries: any[];
  submitted: boolean = false;
  isDisabled: boolean = true;
  message: string = ""

  onSubmit() {
    this.orderService.uploadOrders(this.orders);
    this.submitted = true;
  }

  clearValue(e: any) {
    e.value = '';
  }

  uploadExcel(oEvent) {
    // clear previous data
    this.orders = undefined;
    this.faultyEntries = undefined;
    // process file and get orders data or faulty entries
    this.fileService.uploadFile(oEvent, data => {
      this.fileService.processFileData(data, callback => {
        if (callback.code == 200) {
          var orders = callback.data as Order[];
          for (let i in orders) {
            this.geocodeAddrByPostal(orders[i].fromAddress.postal, (address) => {
              orders[i].fromAddress = address;
              orders[i].location.coordinates = [address.geoLocation.lng, address.geoLocation.lat];
              orders[i].location.type = 'Point';
            });
            this.geocodeAddrByPostal(orders[i].toAddress.postal, (address) => {
              orders[i].toAddress = address;
            });
          }
          setTimeout(() => this.isDisabled = false, 3000);
          this.orders = orders;
        } else {
          this.faultyEntries = callback.data;
          this.message = callback.message;
          console.log(callback.data);
        }
      })
      for (var object in data) {
      }
    })
  }

  private geocodeAddrByPostal(postal: number, out) {
    this.mapService.getGeoDataForPostalCode(postal, (callback) => {
      if (callback.code === 200) {
        var address = new Address(new GeoLocation())
        address.geoLocation.lat = callback.geolocation.lat;
        address.geoLocation.lng = callback.geolocation.lng;
        address.street = callback.address;
        address.postal = postal;
        out(address);
      }
    })
  }

  downloadTemplate() {
    this.fileService.downloadFileTemplate();
  }
}
