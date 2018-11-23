import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// login
import { FormsModule } from '@angular/forms';
//import { UserAuthenticationService } from './login/login.service';
//import { ModuleRoleService } from './login/modulerole/modulerole.service';


import { StarterViewComponent } from './starterview.component';
import { LoginComponent } from './login/login.component';

import { PeityModule } from '../../components/charts/peity';
import { SparklineModule } from '../../components/charts/sparkline';
import { CoberturaComponent } from '../cobertura/cobertura.component';

@NgModule({
  declarations: [
    StarterViewComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule,
    PeityModule,
    SparklineModule,
    
  ],
  exports: [
    StarterViewComponent,
    LoginComponent
  ],
})

export class AppviewsModule {
}
