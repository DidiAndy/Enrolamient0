import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { ConstantService } from '../util/constant.service';
import { Dependientes } from '../entities/dependientes';
import { tipoCuenta } from '../entities/tipoCuenta';
import { Banco } from '../entities/Banco';
import { Plan } from '../entities/plan';
import { Parentesco } from '../entities/parentesco';
import { Cobertura } from '../entities/cobertura';
import { tipoDoc } from '../entities/tipoDoc';
import { Empresa } from 'app/views/entities/Empresa';


@Injectable()
export class CoberturaService {

    private coberturaUrl = 'cobertura/titular';
    private coberturaUrlLocal = 'cobertura/titularLocal';
    private dependienteUrlLocal = 'cobertura/dependienteLocal';
    private dependienteUrl = 'cobertura/dependiente';
    private tipoDocUrl = 'cobertura/tipoDoc';
    private BancoUrl = 'catalogos/banco';
    private tipoCuentaUrl = 'catalogos/tipoCuenta';
    private PlanUrl = 'catalogos/plan'
    public ParentescoUrl = 'catalogos/parentesco';
    public GuardarCobertura = 'cobertura/CoberturaSave';
    public GuardarDependiente = 'cobertura/DependienteSave';
    public BorrarDependiente='cobertura/DeleteDependiente';
    public CargarEmpresa = 'empresa';
    public ImprimirPDF = 'cobertura/ArchivoPdf';

    constructor(private http: Http, private constantService: ConstantService) {
        this.coberturaUrl = this.constantService.API_ENDPOINT + this.coberturaUrl;
        this.BorrarDependiente = this.constantService.API_ENDPOINT + this.BorrarDependiente;
        this.coberturaUrlLocal = this.constantService.API_ENDPOINT + this.coberturaUrlLocal;
        this.dependienteUrlLocal = this.constantService.API_ENDPOINT + this.dependienteUrlLocal;
        this.GuardarCobertura = this.constantService.API_ENDPOINT + this.GuardarCobertura;
        this.GuardarDependiente = this.constantService.API_ENDPOINT + this.GuardarDependiente;
        this.dependienteUrl = this.constantService.API_ENDPOINT + this.dependienteUrl;
        this.tipoDocUrl = this.constantService.API_ENDPOINT + this.tipoDocUrl;
        this.BancoUrl = this.constantService.API_ENDPOINT + this.BancoUrl;
        this.tipoCuentaUrl = this.constantService.API_ENDPOINT + this.tipoCuentaUrl;
        this.PlanUrl = this.constantService.API_ENDPOINT + this.PlanUrl;
        this.ParentescoUrl = this.constantService.API_ENDPOINT + this.ParentescoUrl;
        this.CargarEmpresa = this.constantService.API_ENDPOINT + this.CargarEmpresa;
        this.ImprimirPDF = this.constantService.API_ENDPOINT + this.ImprimirPDF;
    }

    findEmpresabyName(descripcion: string): Observable<Empresa> {
        return this.http.get(this.CargarEmpresa + '/' + descripcion)
            .map(this.extractData)
            .catch(this.handleError);
    }

    findTitularbyId(noIdentificacion: string): Observable<Cobertura> {
        return this.http.get(this.coberturaUrl + '/' + noIdentificacion)
            .map(this.extractData)
            .catch(this.handleError);
    }
    findTitularLocalbyId(noIdentificacion: string): Observable<Cobertura> {
        return this.http.get(this.coberturaUrlLocal + '/' + noIdentificacion)
            .map(this.extractData)
            .catch(this.handleError);
    }

    findDependienteLocalbyId(noIdentificacion: string): Observable<Dependientes> {
        return this.http.get(this.dependienteUrlLocal + '/' + noIdentificacion)
            .map(this.extractData)
            .catch(this.handleError);
    }

    findDependientebyId(noIdentificacion: string): Observable<Dependientes> {
        return this.http.get(this.dependienteUrl + '/' + noIdentificacion)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getTipoDoc(): Observable<any[]> {
        return this.http.get(this.tipoDocUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getTipoCuenta(status: boolean): Observable<tipoCuenta[]> {
        return this.http.get(this.tipoCuentaUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getBanco(status: boolean): Observable<Banco[]> {
        return this.http.get(this.BancoUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getPlan(status: boolean): Observable<Plan[]> {
        return this.http.get(this.PlanUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getParentesco(status: boolean): Observable<Parentesco[]> {
        return this.http.get(this.ParentescoUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        const body = res.json();
        return body || null;
    }
    private handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
    saveCobertura(cobertura: Cobertura): Observable<boolean> {
        const body = JSON.stringify(cobertura);    
        const headers = new Headers({ 'Content-type': 'application/json' });
        const options = new RequestOptions({ headers: headers });          
            return this.http.post(this.GuardarCobertura, body, options)
                .map(this.extractData)
                .catch(this.handleError);
        
    }

    saveDependiente(dependiente: Dependientes): Observable<any> {
        const body = JSON.stringify(dependiente);
        console.log(body);
        const headers = new Headers({ 'Content-type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
     
            return this.http.post(this.GuardarDependiente, body, options)
                .map(this.extractData)
                .catch(this.handleError);
       
    }

    deleteDependiente(dependiente: Dependientes): Observable<any> {
        const body = JSON.stringify(dependiente);
        const headers = new Headers({ 'Content-type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.BorrarDependiente, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    imprimirPDF(descripcion: string): Observable<any> {
        return Observable.create(observer => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', this.ImprimirPDF + "/" + descripcion, true);
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
            xhr.send();
        });
    }

}

