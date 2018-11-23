import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { ConstantService } from '../../util/constant.service';
import { WinningReason } from '../../entities/winningReason';


@Injectable()
export class WinningReasonService {

    private winningReasonUrl = 'winningReason';

    constructor(private http: Http, private constantService: ConstantService) {
        this.winningReasonUrl = this.constantService.API_ENDPOINT + this.winningReasonUrl;
    }

    findAllWinningReason(status: boolean): Observable<WinningReason[]> {
        return this.http.get(this.winningReasonUrl + '/' + status)
            .map(this.extractData)
            .catch(this.handleError);
    }

    saveWinningReason(winningReason: WinningReason): Observable<boolean> {
        const body = JSON.stringify(winningReason);
        const headers = new Headers({ 'Content-type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        if (winningReason.Id === 0) {
            return this.http.post(this.winningReasonUrl, body, options)
                .map(this.extractData)
                .catch(this.handleError);
        } else {
            return this.http.put(this.winningReasonUrl, body, options)
                .map(this.extractData)
                .catch(this.handleError);
        }

    }

    deleteWinningReason(winningReasonId: number): Observable<boolean> {
        return this.http.delete(this.winningReasonUrl + '/' + winningReasonId)
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
