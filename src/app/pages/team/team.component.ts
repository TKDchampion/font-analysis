import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PagesService } from '../pages.service';
import { TeamVsInfo, TokenInfo } from './team.model';
import { StorageService, JWTOptions } from 'ngx-startkit';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private storage: StorageService,
    private option: JWTOptions
  ) { }

  ngOnInit() {
    this.teamId = this.route.snapshot.paramMap.get('id');
    this.getPlayerListId(this.teamId);
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
    const obj = {
      account: this.account,
      password: this.password
    };
    this.pagesService.login(obj).subscribe((resp: TokenInfo) => {
      if (resp.access_token) {
        this.storage.set(this.option.key, resp);
        this.popupLogin = false;
        this.isLogin = true;
        alert('登入成功');
      } else {
        alert('登入失敗');
      }
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

  getPlayerListId(id) {
    this.pagesService.getPlayerListId({ id }).subscribe((resp: any) => {
      this.teamVsList = resp;
      console.log(this.teamVsList);

    });
  }

}
