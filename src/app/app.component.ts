import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

// import { AssignOrderComponent,
//   LocateDriverComponent,
//   UploadOrderComponent,
//   PaymentFlowComponent,
//   ManagementComponent,
//   DriverComponent,
//   OrderComponent } from './index';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
})
export class AppComponent {
  title = 'Welcome to WeLo SG Control Center';
}
