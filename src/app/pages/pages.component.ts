import { Component, OnInit } from '@angular/core';
import { PagesService } from './pages.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  expand = true;
  pagesIndex = 0;
  playerList = [];
  constructor(private pagesService: PagesService) { }

  ngOnInit() {
    this.getPlayersList();
  }

  getPlayersList() {
    this.pagesService.getPlayerList().subscribe((resp: any) => {
      this.playerList = resp.list;
    });
  }

  goAnalysis() {
    this.pagesIndex = 1;
  }
}
