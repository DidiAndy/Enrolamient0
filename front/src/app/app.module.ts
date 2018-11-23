import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';



import { FormsModule } from '@angular/forms';


import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy,PathLocationStrategy } from '@angular/common';

import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

// App views
import { AppviewsModule } from './views/appviews/appviews.module';

import { AdminModule } from './views/admin/admin.module';


// App modules/components
import { LayoutsModule } from './components/common/layouts/layouts.module';

import { AuthConfig, AuthHttp, JwtHelper } from 'angular2-jwt';
//import { AuthGuardAndChildService } from './views/util/authguardandchild.service';
import { FileUploadModule } from 'ng2-file-upload/file-upload/file-upload.module';
//import { ProspectModule } from './views/prospect/prospect.module';

import { CoberturaModule } from './views/cobertura/cobertura.module';
import { CarouselModule } from 'angular2-carousel';
import { DirectiveModule } from './views/directives/directive.module';
import { ReporteModule } from './views/Reporte/reporte.module';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    noJwtError: true,
    headerName: 'Authorization',
    headerPrefix: 'Bearer',
    tokenName: 'token',
    tokenGetter: (() => sessionStorage.getItem('token'))
  }), http, options);
}


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LayoutsModule,
    AppviewsModule,
    AdminModule,
    Ng2Bs3ModalModule,
    //ProspectModule,
    RouterModule.forRoot(ROUTES),
    //FileUploadModule,    
    CoberturaModule,
    ReporteModule
    

  ],
  providers: [
   // sin # 
   { provide: PathLocationStrategy, useClass: HashLocationStrategy },
    //{ provide: LocationStrategy, useClass: HashLocationStrategy },
    JwtHelper,
    //AuthGuardAndChildService,
    { provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http, RequestOptions] }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
