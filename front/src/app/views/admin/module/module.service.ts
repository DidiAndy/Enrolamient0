import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { ConstantService } from '../../util/constant.service';
import { AuthHttp } from 'angular2-jwt';
import { Module } from '../../entities/module';



@Injectable()
export class ModuleService {

    private moduleUrl = 'module';

    constructor(private http: Http, private constantService: ConstantService) {
        this.moduleUrl = this.constantService.API_ENDPOINT + this.moduleUrl;
    }

    findAllModules(status: boolean): Observable<Module[]> {
        return this.http.get(this.moduleUrl + '/' + status)
            .map(this.extractData)
            .catch(this.handleError);
    }

    saveModule(module: Module): Observable<boolean> {
        const body = JSON.stringify(module);
        const headers = new Headers({ 'Content-type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        if (module.Id === 0) {
            return this.http.post(this.moduleUrl, body, options)
                .map(this.extractData)
                .catch(this.handleError);
        } else {
            return this.http.put(this.moduleUrl, body, options)
                .map(this.extractData)
                .catch(this.handleError);
        }

    }

    deleteModule(moduleId: number): Observable<boolean> {
        return this.http.delete(this.moduleUrl + '/' + moduleId)
            .map(this.extractData)
            .catch(this.handleError);
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
