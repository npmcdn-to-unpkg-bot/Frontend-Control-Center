import { provideRouter, RouterConfig } from '@angular/router';

import {LocateDriverComponent} from './locate-driver/index';
import {AssignOrderComponent} from './assign-order/index';
import {UploadOrderComponent, SingleOrderInputComponent, BatchOrderUploadComponent} from './upload-order/index';
import {PaymentFlowComponent} from './payment-flow/index';
import {ManagementComponent} from './management/index';

const routes: RouterConfig = [
  { path: '', redirectTo: 'locateDrivers', terminal: true },
  { path: 'locateDrivers', component: LocateDriverComponent },
  { path: 'assignOrders', component: AssignOrderComponent },
  { path: 'uploadOrders', component: UploadOrderComponent, children: [
    { path: '', component: SingleOrderInputComponent},
    { path: 'manual', component: SingleOrderInputComponent},
    { path: 'batch', component: BatchOrderUploadComponent}    
  ]},
  { path: 'paymentFlow', component: PaymentFlowComponent },  
  { path: 'management', component: ManagementComponent },
//   { path: 'about', component: About },
//   { path: 'github', component: RepoBrowser, children: [
//     { path: ':org', component: RepoList, children: [
//       { path: ':repo', component: RepoDetail },
//       { path: '', component: RepoDetail }
//     ]},
//     { path: '', component: RepoList}
//   ]}
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];