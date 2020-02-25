import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { global } from  '../global';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()
export class AuthSonicuProvider {
    header:any;
    options:any;
    requestHeaders:any;
    constructor(private http: HttpClient, private router:Router) {
        let token = this.getSessionToken();
        if(token){
            this.requestHeaders = new  HttpHeaders()
            .set('Accept', 'application/json')
            .set("Authorization","token "+ token)
        }else{
            this.requestHeaders = new HttpHeaders()
                .set('Accept', 'application/json')
        }
        this.options = {
            headers: this.requestHeaders
        }
    }

    public userLoginSonicu(data):Observable<any>{
        return this.http.post<any>(global.API_USER_LOGIN_SONICU,data,this.options).pipe();
    }


    public getSessionToken() {
        return localStorage.getItem('auth_token');
    }



}
