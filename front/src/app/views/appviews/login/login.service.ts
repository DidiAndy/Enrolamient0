import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { ConstantService } from 'app/views/util/constant.service';
import { UserAuth } from 'app/views/entities/login/userauth';
import { User } from 'app/views/entities/login/user';
import { TokenCreated } from 'app/views/entities/login/tokencreated';
import { AuthHttp } from 'angular2-jwt';
import { ChangePassword } from '../../entities/login/changepasword';

@Injectable()
export class UserAuthenticationService {

    private userAuthenticationUrl = 'auth';

    constructor(private authHttp: AuthHttp, private constantService: ConstantService, private http: Http) {
        this.userAuthenticationUrl = constantService.API_ENDPOINT + this.userAuthenticationUrl;
    }

    getUserAuthentication(userAuth: UserAuth): Observable<TokenCreated> {
        const body = JSON.stringify(userAuth);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        });
        const options = new RequestOptions({ headers: headers });
        if (userAuth.UserName != null && userAuth.Secret != null) {
            return this.http.post(this.userAuthenticationUrl, body, options)
                .map(this.extractData)
                .catch(this.handleError);
        }
    }

    findInAD(userName: string): Observable<string> {
        const headers = new Headers({
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        });
        const options = new RequestOptions({ headers: headers });
        if (userName != null) {
            return this.authHttp.get(this.userAuthenticationUrl + '/userAD/' + userName, options)
                .map(this.extractData)
                .catch(this.handleError);
        }
    }

    ValidateToken(): Observable<boolean> {
        const headers = new Headers({
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        });
        const options = new RequestOptions({ headers: headers });
        return this.authHttp.get(this.userAuthenticationUrl + '/validate', options)
            .map(this.extractData)
            .catch(this.handleAuthError);

    }

    changeUserPassword(user: ChangePassword): Observable<boolean> {
        const body = JSON.stringify(user);
        const headers = new Headers({
            'Content-Type': 'application/json',
        });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.userAuthenticationUrl + '/change', body, options)
            .map(this.extractData)
            .catch(this.handleError);

    }

    private extractData(res: Response) {
        const body = res.json();
        return body || false;
    }

    private handleError(error: any) {
        const errMsg = ((error.message) ? error.message : error.status) ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(error.status); // log to console instead
        return Observable.of(false);

    }

    private handleAuthError(error: any) {
        return Observable.of(false);
    }
}

