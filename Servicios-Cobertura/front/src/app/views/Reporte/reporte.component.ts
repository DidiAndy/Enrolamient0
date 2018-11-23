import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ReporteService } from 'app/views/Reporte/reporte.service';
import swal from 'sweetalert2';
import 'jquery';
import 'bootstrap';
import { Reporte } from '../entities/reporte';
import { Empresa } from '../entities/Empresa';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap';

declare var jQuery: any;

@Component({
    templateUrl: 'reporte.template.html'
})

export class ReporteComponent implements OnInit {
    reporte : Reporte
    empresa:Empresa
    fechaActual:Date
    dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
    locale = 'es';    
    constructor(private localeService: BsLocaleService, private route: Router, private elementRef: ElementRef,private ReporteService: ReporteService) {
    }

    ngOnInit() {
        this.reporte = new Reporte();
        this.reporte.sec_empresa = 0;
        this.dpConfig.showWeekNumbers = false;
        this.localeService.use(this.locale);
        this.ReporteService.findEmpresas().subscribe(result => {
            this.empresa = result;
            console.log(this.empresa);
        }, error => {
            console.log(error);
        });
        this.fechaActual= new Date();
        console.log(this.fechaActual)
    }
    
    generar(): void {
        
        if (this.reporte) {
            this.ReporteService.exportarExcel(this.reporte).subscribe(result => {
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.className = "hidden";
                let url = window.URL.createObjectURL(result);
                a.href = url;
                a.download = 'ArchivoExcelCobertura' + (new Date()).getFullYear() + ((new Date()).getMonth() + 1) + (new Date()).getDate() + (new Date()).getTime() + '.xlsx';
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(result, 'ArchivoCobertura' + (new Date()).getFullYear() + ((new Date()).getMonth() + 1) + (new Date()).getDate() + (new Date()).getTime() + '.xlsx');
                }
                else {
                    a.click();
                    window.URL.revokeObjectURL(url);
                }
                window.location.reload();
            }, error => {
                swal({
                    title: 'Error',
                    text: 'Existió un error al almacenar la cobertura',
                    type: 'error',
                    allowOutsideClick: false,
                    showCancelButton: false
                });
            })
        }
        else {
                swal({
                    title: 'Error',
                    text: 'No Existen registros guardados!',
                    type: 'error',
                    allowOutsideClick: false,
                    showCancelButton: false
                });
            
        }
    }
    prevent(event: any) {
        event.preventDefault();
        return false;
    }
    
}


