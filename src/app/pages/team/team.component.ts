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
  popupDescription = false;
  password: string;
  account: string;
  isLogin = false;
  tokenContain: any;
  bsValue: Date = new Date();
  messagesList: any;
  messagesText: string;
  team: any;
  replyText: string;
  counts = 0;
  members = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private storage: StorageService,
    private option: JWTOptions,
    private spinner: NgxSpinnerService
  ) {
    this.teamId = this.route.snapshot.paramMap.get('id');
    this.getUserMembers();
  }

  ngOnInit() {
    this.init();
    this.isLogin = !!this.storage.get('token');
    this.tokenContain = this.isLogin ? this.storage.get('token') : '';
    this.team = this.storage.get('team');
    this.getUser();
  }

  init() {
    this.spinner.show();
    this.pagesService.getPlayerListId({ id: this.teamId, time: this.formatterDate(this.bsValue) }).subscribe((resp: any) => {
      this.teamVsList = resp;
      this.getPlayerMessagesId(this.teamId);
    });
  }

  getUser() {
    this.pagesService.getUserCounts({ userId: this.tokenContain.userId }).subscribe((resp: any) => {
      this.counts = resp.counts;
    });
  }

  getUserMembers() {
    this.pagesService.getUserMembers().subscribe((resp: any) => this.members = resp.length);
  }

  goBack() {
    this.router.navigateByUrl('/pages');
  }

  login() {
    this.popupLogin = !this.popupLogin;
    this.popupMessages = false;
    this.popupDescription = false;
  }

  singin() {
    this.spinner.show();
    const obj = {
      account: this.account,
      password: this.password
    };
    this.pagesService.singin(obj).subscribe((resp: TokenInfo) => {
      alert('註冊成功');
      this.getUserMembers();
      this.spinner.hide();
    }, error => {
      alert('註冊失敗');
      this.spinner.hide();
    });
  }

  cancel() {
    this.account = '';
    this.password = '';
    this.popupLogin = false;
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
        this.getUserMembers();
        this.tokenContain = this.storage.get('token');
      } else {
        alert('登入失敗');
      }
      this.getUser();
      this.spinner.hide();
    });
  }

  logout() {
    this.storage.clear();
    this.goBack();
  }

  openReply(replyItem) {
    if (!replyItem.isReply) {
      this.spinner.show();
      this.pagesService.getPlayerMessagesReplyId({ id: replyItem.replyId }).subscribe(resp => {
        replyItem.isReply = true;
        replyItem.reply = resp;
        this.spinner.hide();
      });
    } else {
      replyItem.isReply = false;
    }
  }

  messages() {
    this.popupLogin = false;
    this.popupDescription = false;
    this.popupMessages = !this.popupMessages;
  }

  description() {
    this.popupLogin = false;
    this.popupMessages = false;
    this.popupDescription = !this.popupDescription;
  }

  messagesSumit() {
    this.spinner.show();
    const obj = {
      author: this.tokenContain.account,
      content: this.messagesText,
      replyId: this.generatorId(),
      time: this.formatterDate(new Date(), true),
      userId: this.tokenContain.userId
    };
    this.pagesService.putPlayerMessages(this.teamId, obj).subscribe(resp => {
      this.getPlayerMessagesId(this.teamId);
    });
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
      this.popupMessages = false;
      this.spinner.hide();
    });
  }

  analysisBtn(id, item) {
    this.spinner.show();
    const obj = {
      id,
      account: this.tokenContain.account,
      time: item.time,
      game_id: item.game_id
    };

    this.pagesService.getPlayerListAnalysisId(obj).subscribe((resp: any) => {
      if (item.active) {
        if (resp.team1_winRate && resp.team2_winRate) {
          item.team1_winRate = resp.team1_winRate;
          item.team2_winRate = resp.team2_winRate;
        } else {
          alert('預測資料還沒出來或是你沒權限跟足夠的次數');
        }
      }
      this.getUser();
      this.spinner.hide();
    });
  }

  deleteMessage(item) {
    this.spinner.show();
    delete item.replyConuts;
    this.pagesService.deletePlayerMessages(this.teamId, item).subscribe(resp => {
      this.getPlayerMessagesId(this.teamId);
    });
  }

  replySubmit(item) {
    const obj = {
      author: this.tokenContain.account,
      content: this.replyText,
      time: this.formatterDate(new Date(), true),
      userId: this.tokenContain.userId
    };
    this.spinner.show();
    this.pagesService.putPlayerReply(item.replyId, obj).subscribe(resp => {
      this.pagesService.getPlayerMessagesReplyId({ id: item.replyId }).subscribe(res => {
        item.isReply = true;
        item.reply = res;
        this.replyText = '';
        this.spinner.hide();
      });
    });
  }

  deleteReply(replyItem, item) {
    this.spinner.show();
    this.pagesService.deletePlayerReply(item.replyId, replyItem).subscribe(resp => {
      this.pagesService.getPlayerMessagesReplyId({ id: item.replyId }).subscribe(res => {
        item.isReply = true;
        item.reply = res;
        this.spinner.hide();
      });
    });
  }

  private formatterDate(time, detail = false) {
    return detail ? formatDate(time, 'yyyy/MM/dd HH:mm', 'en') : formatDate(time, 'yyyy/MM/dd', 'en');
  }

  private generatorId() {
    return Math.random().toString(36).substr(2, 7) + Date.now().toString(36).substr(4, 9);
  }
}
