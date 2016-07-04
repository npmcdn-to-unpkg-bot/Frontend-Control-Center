import { Component, OnInit } from '@angular/core';
import { DriverService } from './driver.service'
import { Driver } from './driver'

@Component({
  moduleId: module.id,
  selector: 'app-driver',
  templateUrl: 'driver.component.html',
  styleUrls: ['driver.component.css'],
  providers: [DriverService]
})
export class DriverComponent implements OnInit {
  errorMessage: string;
  drivers: Driver[];
  mode = 'Observable';

  constructor(private driverService: DriverService) {}

  ngOnInit() {
     this.getDrivers(); 
  }

  getDrivers(){
    this.driverService.getDrivers().subscribe(
      drivers => this.drivers = drivers,
      error => this.errorMessage = <any>error
    );
  }

}
