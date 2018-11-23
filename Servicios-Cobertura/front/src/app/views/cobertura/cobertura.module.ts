import { NgModule } from '@angular/core';
import { CoberturaComponent } from '../cobertura/cobertura.component';
import { BrowserModule } from '../../../../node_modules/@angular/platform-browser';
import { CarouselModule } from 'angular2-carousel';
import { FormsModule } from '@angular/forms';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CoberturaService } from './cobertura.service';
import { DirectiveModule } from 'app/views/directives/directive.module';

@NgModule({
    imports: [
        BrowserModule,
        CarouselModule,
        FormsModule,
        BsDatepickerModule.forRoot(),
        DatepickerModule.forRoot(),
        DirectiveModule,

    ],
    declarations:
        [
            CoberturaComponent,
        ],
    exports: [CoberturaComponent],
    providers: [
        CoberturaService
    ]
})
export class CoberturaModule { }
