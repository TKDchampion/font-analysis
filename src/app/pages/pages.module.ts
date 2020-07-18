import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { TeamComponent } from './team/team.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [PagesComponent, TeamComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    NgxSpinnerModule
  ]
})
export class PagesModule { }
