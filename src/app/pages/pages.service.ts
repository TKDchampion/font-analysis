import { Injectable } from '@angular/core';
import { BaseService, HttpDefaultOptions } from 'ngx-startkit';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagesService extends BaseService {

  constructor(http: HttpClient, options: HttpDefaultOptions) {
    super(http, options);
  }

  getPlayerList() {
    return this.get('v1/getPlayerList');
  }

  getPlayerListId(obj: object) {
    return this.get('v1/getPlayerListId', {
      queryObject: obj
    });
  }

  getPlayersListAnalysisId(obj: object) {
    return this.post('v1/getPlayersListAnalysisId', {
      body: obj
    });
  }

  login(obj: object) {
    return this.post('v1/login', {
      body: obj
    });
  }

  getPlayerMessagesId(obj: object) {
    return this.get('v1/getPlayerMessagesId', {
      queryObject: obj
    });
  }
}
