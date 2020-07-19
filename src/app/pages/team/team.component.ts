import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PagesService } from '../pages.service';
import { TeamVsInfo, TokenInfo } from './team.model';
import { StorageService, JWTOptions } from 'ngx-startkit';
import { NgxSpinnerService } from 'ngx-spinner';
import { formatDate } from '@angular/common';

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
  bsValue: Date = new Date();

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
    this.spinner.show();
    this.getPlayerListId(this.teamId, this.formatterDate(this.bsValue));
    this.isLogin = !!this.storage.get('token');
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

  analysisBtn(id, item) {
    this.spinner.show();
    this.pagesService.getPlayersListAnalysisId({ id }).subscribe((resp: any) => {
      if (item.active) {
        if (item.win || item.myWin) {
          item.win = resp.win;
          item.myWin = resp.myWin;
        } else {
          alert('預測資料還沒出來');
        }
      }
      this.spinner.hide();
    });
  }

  private formatterDate(time) {
    return formatDate(time, 'yyyy/MM/dd', 'en');
  }
}
