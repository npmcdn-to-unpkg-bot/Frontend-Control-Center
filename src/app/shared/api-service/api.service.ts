import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'

const API_ENDPOINT = {
  host: 'http://localhost',
  port: 3000,
  path: '',
  needsAuth: false
};

// live example with HTTP Basic Auth
/*
.constant('API_ENDPOINT', {
  host: 'http://yourserver.com',
  path: '/api/v2',
  needsAuth: true,
  username: 'whatever',
  password: 'foobar'
});
*/

@Injectable()
export class ApiService {

  constructor() { }
  private _api = API_ENDPOINT;
  private endpoint = this._api.port ? (this._api.host + ':' + this._api.port + this._api.path) : (this._api.host + this._api.path);

  // TODO: implement basic http auth

  // public api
  getEndpoint() {
    return this.endpoint;
  }

}
