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

  getPlayerListAnalysisId(obj: object) {
    return this.post('v1/getplayerListAnalysisId', {
      body: obj
    });
  }

  getUserCounts(id: object) {
    return this.get('v1/getUserCounts', {
      queryObject: id
    });
  }

  getUserMembers() {
    return this.get('v1/getUserMembers');
  }

  login(obj: object) {
    return this.post('v1/login', {
      body: obj
    });
  }

  singin(obj: object) {
    return this.post('v1/singin', {
      body: obj
    });
  }

  getPlayerMessagesId(obj: object) {
    return this.get('v1/getPlayerMessagesId', {
      queryObject: obj
    });
  }

  getPlayerMessagesReplyId(obj: object) {
    return this.get('v1/getPlayerMessagesReplyId', {
      queryObject: obj
    });
  }

  putPlayerMessages(teamId: string, obj: object) {
    return this.put(`v1/putPlayerMessages?teamId=${teamId}`, {
      body: obj
    });
  }

  deletePlayerMessages(teamId: string, obj: object) {
    return this.put(`v1/deletePlayerMessages?teamId=${teamId}`, {
      body: obj
    });
  }

  putPlayerReply(replyId: string, obj: object) {
    return this.put(`v1/putPlayerReply?replyId=${replyId}`, {
      body: obj
    });
  }

  deletePlayerReply(replyId: string, obj: object) {
    return this.put(`v1/deletePlayerReply?replyId=${replyId}`, {
      body: obj
    });
  }
}
