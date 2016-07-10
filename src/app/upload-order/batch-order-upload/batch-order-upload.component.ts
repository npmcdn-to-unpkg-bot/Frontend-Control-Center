import { Component, OnInit } from '@angular/core';
import { FileService } from '../../shared/file-service/file.service';
import { MapService } from '../../shared/location-service/map.service';
import { Order, Address, GeoLocation, Location } from '../../management/order/order'

@Component({
  moduleId: module.id,
  selector: 'app-batch-order-upload',
  templateUrl: 'batch-order-upload.component.html',
  styleUrls: ['batch-order-upload.component.css'],
  providers: [FileService, MapService]
})
export class BatchOrderUploadComponent implements OnInit {

  constructor(private fileService: FileService, private mapService: MapService) { }
  ngOnInit() {
  }

  displayData: any;

  uploadExcel(oEvent) {
    this.fileService.uploadFile(oEvent, data => {
      this.fileService.processFileData(data, callback => {
        if (callback.code == 200) {
          var orders = callback.data as Order[];
          for (let i in orders) {
            this.geocodeAddrByPostal(orders[i].fromAddress.postal, (address) => {
              orders[i].fromAddress = address;
              orders[i].location.coordinates = [address.geoLocation.lat, address.geoLocation.lng];
              orders[i].location.type = 'Point';
            });
            this.geocodeAddrByPostal(orders[i].toAddress.postal, (address) => {
              orders[i].toAddress = address;
            });
          }
        } else {
          // TODO: display a dialog to show faulty entries
        }
        console.log(callback.data);
        this.displayData = callback.data;
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

  // TODO: delete after complete the function
  get diagnose(){
      return JSON.stringify(this.displayData);
  }

  downloadTemplate(){
    this.fileService.downloadFileTemplate();
  }
}
