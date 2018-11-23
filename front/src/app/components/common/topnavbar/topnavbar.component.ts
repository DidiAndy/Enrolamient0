import { Component, OnInit, ElementRef, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { ActivatedRoute } from '@angular/router';
//import { StatusService } from '../../../views/admin/status/status.service';
import { CoberturaService } from '../../../views/cobertura/cobertura.service';
import { Empresa } from '../../../views/entities/Empresa';
import { CoberturaComponent } from '../../../views/cobertura/cobertura.component';
import 'rxjs/add/observable/fromEvent';
import { Observable } from 'rxjs/Observable';
import * as Rx from "rxjs";
declare var jQuery: any;

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html'
})
export class TopNavbarComponent implements OnInit {
  imagen: string;
  mensaje: string;
  empresa: Empresa;

  toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }
  constructor() {
  }

  ngOnInit() {
    this.imagen = "";
  }



}
