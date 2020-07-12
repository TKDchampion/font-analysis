import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxStartkitModule, HttpDefaultOptions, JWTOptions } from 'ngx-startkit';
import { FormsModule } from '@angular/forms';

export class AnalysisHttpDefaultOptions extends HttpDefaultOptions {
  baseApiURL = 'https://analysis-a7071.web.app/api/';
}

export class AnalysisJWTOptions extends JWTOptions {
  key = 'token';
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxStartkitModule,
    FormsModule
  ],
  providers: [{
    provide: HttpDefaultOptions,
    useClass: AnalysisHttpDefaultOptions
  },
  {
    provide: JWTOptions,
    useClass: AnalysisJWTOptions
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
