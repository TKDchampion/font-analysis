import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { TeamComponent } from './team/team.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PagesComponent, TeamComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule
  ]
})
export class PagesModule { }
