import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { ConstantService } from '../util/constant.service';
import { Plan } from '../entities/plan';

@Injectable()
export class PlanService {

    private planUrl = 'plan';

    constructor(private http: Http, private constantService: ConstantService) {
        this.planUrl = this.constantService.API_ENDPOINT + this.planUrl;
    }

    findAllPlan(status: boolean): Observable<Plan[]> {
        return this.http.get(this.planUrl + '/' + status)
            .map(this.extractData)
            .catch(this.handleError);
    }

    savePlan(plan: Plan): Observable<boolean> {
        const body = JSON.stringify(plan);
        const headers = new Headers({ 'Content-type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        if (plan.Id === 0) {
            return this.http.post(this.planUrl, body, options)
                .map(this.extractData)
                .catch(this.handleError);
        } else {
            return this.http.put(this.planUrl, body, options)
                .map(this.extractData)
                .catch(this.handleError);
        }

    }

    deletePlan(planId: number): Observable<boolean> {
        return this.http.delete(this.planUrl + '/' + planId)
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
