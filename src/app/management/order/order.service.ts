import { Injectable } from '@angular/core';
import { Order } from './order';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

@Injectable()
export class OrderService {

  constructor(private http: Http) { }

  private ordersUrl = 'app/management/order/orders.json'; //url to web API
  
  getOrders(): Observable<Order[]>{
    return this.http.get(this.ordersUrl).map(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    // depends on what is the response from the remote server, change 'data' to the specific JSON tag
    return body.orders || { };
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
