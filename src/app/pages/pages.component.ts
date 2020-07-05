import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  expand = true;
  pagesIndex = 0;
  constructor() { }

  ngOnInit() {
  }

  goAnalysis() {
    this.pagesIndex = 1;
  }
}
