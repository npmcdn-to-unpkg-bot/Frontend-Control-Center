import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../shared/driver-service/driver.service';
import { Driver } from '../../shared/driver-service/driver';
import { DataTable, Column } from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'app-driver',
  templateUrl: 'driver.component.html',
  styleUrls: ['driver.component.css'],
  directives: [DataTable, Column],
  providers: [DriverService]
})
export class DriverComponent implements OnInit {
  errorMessage: string;
  drivers: Driver[];
  mode = 'Observable';
  cols: any[]

  constructor(private driverService: DriverService) { }

  ngOnInit() {
    this.getDrivers();
    this.createDriversTable();
  }

  private createDriversTable() {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Phone' },
      { field: 'drivingLicense', header: 'Driving License' },
      { field: 'vehiceNumber', header: 'Vehicle Number' },
      { field: 'ic', header: 'NRIC' },
    ];
  }

  private getDrivers() {
    this.driverService.getDrivers().subscribe(
      drivers => {
        this.drivers = drivers;

      },
      error => this.errorMessage = <any>error
    );
  }

}
