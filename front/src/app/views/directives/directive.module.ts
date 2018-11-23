import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RequiredSelectDirective } from 'app/views/directives/RequiredSelectDirective';
import { IdentificationPatternDirective } from './IdentificationPatternDirective';
import { PruebaDirective } from './pruebaDirective';
import { NumeroDirective } from 'app/views/directives/numeroDirective';


@NgModule({
   declarations: [
      RequiredSelectDirective,
      IdentificationPatternDirective,
      RequiredSelectDirective,
      PruebaDirective,
      NumeroDirective
   ],
   exports:[
     RequiredSelectDirective,
     IdentificationPatternDirective,
     RequiredSelectDirective  ,
     PruebaDirective,
     NumeroDirective
   ],
})

export class DirectiveModule { }
