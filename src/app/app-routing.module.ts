import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', redirectTo: 'pages', pathMatch: 'full'
  },
  {
    path: 'pages',
    loadChildren: () => import('src/app/pages/pages.module').then(p => p.PagesModule),
    // canActivate: [AuthService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
