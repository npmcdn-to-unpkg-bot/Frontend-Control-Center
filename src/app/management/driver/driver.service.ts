import { Injectable } from '@angular/core';
import { Driver } from './driver';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

@Injectable()
export class DriverService {

  constructor(private http: Http) { }

  private driversUrl = 'app/management/driver/drivers.json'; //url to web API
  
  getDrivers(): Observable<Driver[]>{
    return this.http.get(this.driversUrl).map(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    // depends on what is the response from the remote server, change 'data' to the specific JSON tag
    return body.data || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
