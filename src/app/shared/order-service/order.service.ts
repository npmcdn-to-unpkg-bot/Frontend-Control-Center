import { Injectable } from '@angular/core';
import { Order } from './order';
import { Driver } from '../driver-service/driver';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { ApiService } from '../../shared/api-service/api.service'

@Injectable()
export class OrderService {

  constructor(private http: Http, apiService: ApiService) { }

  // GET orders
  getOrders(): Observable<Order[]> {
    let getOrdersUrl = 'app/shared/order-service/orders.json';
    return this.http.get(getOrdersUrl).map(this.extractData).catch(this.handleError);
  }

  // POST new order
  createOrder(order: Order): Observable<Order> {
    let createOrderUrl = '';
    let body = JSON.stringify({ order });
    console.log(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(createOrderUrl, body, options).map(this.extractData).catch(this.handleError);
  }

  // POST orders in batch
  uploadOrders(orders: Order[]): Observable<Order[]> {
    let uploadOrdersUrl = '';
    let body = JSON.stringify({ orders });
    console.log(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(uploadOrdersUrl, body, options).map(this.extractData).catch(this.handleError);
  }

  // POST driver order pairs to assign order to driver
  assignOrdersToDriver(orderDriverPairs: {order: Order, driver: Driver}[]): Observable<Order[]> {
    let uploadOrdersUrl = '';
    var pairs = this.processPairs(orderDriverPairs);
    let body = JSON.stringify({ pairs });
    console.log(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(uploadOrdersUrl, body, options).map(this.extractData).catch(this.handleError);
  }

  private processPairs(orderDriverPairs: {order: Order, driver: Driver}[]){
    var pairs: {orderNo: string, driverId: string}[] = [];
    orderDriverPairs.forEach(pair => {
      var newPair = { orderNo: pair.order.orderId, driverId: pair.driver._id };
      pairs.push(newPair);
    })
    return pairs;
  }

  private extractData(res: Response) {
    let body = res.json();
    // depends on what is the response from the remote server, change 'data' to the specific JSON tag
    return body.orders || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
