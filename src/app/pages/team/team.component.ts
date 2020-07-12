import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PagesService } from '../pages.service';
import { TeamVsInfo } from './team.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  teamId: string;
  teamVsList: TeamVsInfo;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService
  ) { }

  ngOnInit() {
    this.teamId = this.route.snapshot.paramMap.get('id');
    this.getPlayerListId(this.teamId);
  }

  goBack() {
    this.router.navigateByUrl('/pages');
  }

  getPlayerListId(id) {
    this.pagesService.getPlayerListId({ id}).subscribe((resp: any) => {
      this.teamVsList = resp;
      console.log(this.teamVsList);

    });
  }

}
