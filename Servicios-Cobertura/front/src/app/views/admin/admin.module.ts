import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';


//import { ConstantService } from '../util/constant.service';
import { BsDatepickerModule, CarouselComponent } from 'ngx-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { ModuleService } from './module/module.service';
import { ConstantService } from '../util/constant.service';



@NgModule({
  declarations:
    [
      
    ],
  imports:
    [
      BrowserModule,
      FormsModule,
      Ng2Bs3ModalModule,
      
      BsDatepickerModule.forRoot(),
      MultiselectDropdownModule
    ],
  exports:
    [
      
      
    ],
  providers:
    [
      ConstantService,
      ModuleService,

      
    ]
})

export class AdminModule { }
