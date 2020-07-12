import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { TeamComponent } from './team/team.component';


const routes: Routes = [
  { path: '', component: PagesComponent },
  { path: 'team', component: TeamComponent },
  { path: 'team/:id', component: TeamComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
