import { Component, OnInit } from '@angular/core';
import { PagesService } from './pages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  expand = true;
  playerList = [];
  constructor(private pagesService: PagesService, private router: Router) { }

  ngOnInit() {
    this.getPlayersList();
  }

  getPlayersList() {
    this.pagesService.getPlayerList().subscribe((resp: any) => {
      this.playerList = resp.list;
    });
  }

  goAnalysis(player) {
    this.router.navigate(['pages/team', { id: player.teamId }]);
  }
}
