import { Component, OnInit } from '@angular/core';
import { PagesService } from './pages.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageService } from 'ngx-startkit';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  expand = true;
  playerList = [];
  constructor(
    private pagesService: PagesService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private storage: StorageService) { }

  ngOnInit() {
    this.getPlayersList();
  }

  getPlayersList() {
    this.spinner.show();
    this.pagesService.getPlayerList().subscribe((resp: any) => {
      this.playerList = resp.list;
      this.spinner.hide();
    });
  }

  goAnalysis(player) {
    this.router.navigate(['pages/team', { id: player.teamId }]);
    this.storage.set('team', player);
  }
}
