import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PagesService } from '../pages.service';
import { TeamVsInfo, TokenInfo } from './team.model';
import { StorageService, JWTOptions } from 'ngx-startkit';
import { NgxSpinnerService } from 'ngx-spinner';
import { formatDate } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  teamId: string;
  teamVsList: TeamVsInfo;
  popupLogin = false;
  popupMessages = false;
  password: string;
  account: string;
  isLogin = false;
  tokenContain: any;
  bsValue: Date = new Date();
  messagesList: any;
  isReply = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private storage: StorageService,
    private option: JWTOptions,
    private spinner: NgxSpinnerService
  ) {
    this.teamId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.init();
    this.isLogin = !!this.storage.get('token');
    this.tokenContain = this.isLogin ? this.storage.get('token') : '';
  }

  init() {
    this.spinner.show();
    this.pagesService.getPlayerListId({ id: this.teamId, time: this.formatterDate(this.bsValue) }).subscribe((resp: any) => {
      this.teamVsList = resp;
      this.getPlayerMessagesId(this.teamId);
    });
  }

  goBack() {
    this.router.navigateByUrl('/pages');
  }

  login() {
    this.popupLogin = !this.popupLogin;
    this.popupMessages = false;
  }

  loginBtn() {
    this.spinner.show();
    const obj = {
      account: this.account,
      password: this.password
    };
    this.pagesService.login(obj).subscribe((resp: TokenInfo) => {
      if (resp.access_token) {
        this.storage.set(this.option.key, resp);
        this.popupLogin = false;
        this.isLogin = true;
      } else {
        alert('登入失敗');
      }
      this.spinner.hide();
    });
  }

  logout() {
    this.storage.clear();
    this.goBack();
  }
  openReply(replyItem) {
    if (!this.isReply) {
      this.spinner.show();
      this.pagesService.getPlayerMessagesReplyId({ id: replyItem.replyId }).subscribe(resp => {
        this.isReply = true;
        replyItem.reply = resp;
        this.spinner.hide();
      });
    } else {
      this.isReply = false;
    }
  }

  messages() {
    this.popupLogin = false;
    this.popupMessages = !this.popupMessages;
  }

  changeDate(event) {
    this.getPlayerListId(this.teamId, this.formatterDate(event));
  }

  getPlayerListId(id, time) {
    this.spinner.show();
    this.pagesService.getPlayerListId({ id, time }).subscribe((resp: any) => {
      this.teamVsList = resp;
      this.spinner.hide();
    });
  }

  getPlayerMessagesId(id) {
    this.spinner.show();
    this.pagesService.getPlayerMessagesId({ id }).subscribe((resp: any) => {
      this.messagesList = resp;
      this.spinner.hide();
    });
  }

  analysisBtn(id, item) {
    this.spinner.show();
    const obj = {
      id,
      account: this.tokenContain.account,
      time: item.time,
      vsId: item.vsId
    };

    this.pagesService.getPlayersListAnalysisId(obj).subscribe((resp: any) => {
      if (item.active) {
        if (resp.win && resp.myWin) {
          item.win = resp.win;
          item.myWin = resp.myWin;
        } else {
          alert('預測資料還沒出來或是你沒有權限');
        }
      }
      this.spinner.hide();
    });
  }

  private formatterDate(time) {
    return formatDate(time, 'yyyy/MM/dd', 'en');
  }
}
