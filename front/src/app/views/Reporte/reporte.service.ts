import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Dependientes } from '../entities/dependientes';
import { tipoCuenta } from '../entities/tipoCuenta';
import { Banco } from '../entities/Banco';
import { Plan } from '../entities/plan';
import { Parentesco } from '../entities/parentesco';
import { Cobertura } from '../entities/cobertura';
import { tipoDoc } from '../entities/tipoDoc';
import { Empresa } from 'app/views/entities/Empresa';
import { Reporte } from '../entities/reporte';
import { ConstantService } from '../util/constant.service';


@Injectable()
export class ReporteService {

    private excelUrl = 'cobertura/exportarExcel';
    private cargaEmpresa = 'empresa';


    constructor(private http: Http, private constantService: ConstantService) {
        this.cargaEmpresa = this.constantService.API_ENDPOINT + this.cargaEmpresa;
        this.excelUrl = this.constantService.API_ENDPOINT + this.excelUrl;
    }
    findEmpresas(): Observable<Empresa> {
        return this.http.get(this.cargaEmpresa)
            .map(this.extractData)
            .catch(this.handleError);
    }

    exportarExcel(reporte: Reporte): Observable<any> {
        let body = JSON.stringify(reporte);
        return Observable.create(observer => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.excelUrl, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.responseType = 'blob';
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var contentType = 'application/pdf';
                        var blob = new Blob([xhr.response], { type: contentType });
                        observer.next(blob);
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                } else {
                    console.log(xhr.readyState);
                }
            }
            xhr.send(body);
        });
    }

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }
    private handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}

