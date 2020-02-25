import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { global } from  '../global';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthProvider {
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

    public userLogin(data):Observable<any>{
        return this.http.post<any>(global.API_USER_LOGIN,data,this.options).pipe();
    }
        
    public userLogut(){
        this.destroySession();
        return this.http.post(
            global.API_USER_LOGOUT, 
            this.options
        ).pipe();;
    }

    public registerUser(data):Observable<any>{
        return this.http.post<any>(
            global.API_REGISTER_USER,data,this.options).pipe();
    }

    public validateUserEmail(token):Observable<any>{
        let url = global.API_VALIDATE_EMAIL;
        url = url.replace('__token__',token);
        return this.http.post<any>(url,token,this.options).pipe();
    }

    public registerUserConfirmation(data):Observable<any>{
        //data.token
        return this.http.post<any>(
            global.API_REGISTER_USER_CONFIRMATION,data,this.options).pipe();
    }

    public requestResetPassword(data){
        return this.http.post<any>(
            global.API_REQUEST_RECOVER_PASSWORD,data,this.options).pipe();
    }

    public resetUserPassword(data):Observable<any>{
        let url = global.API_RESET_PASSWORD;
        url = url.replace('__token__',data.token);
        return this.http.post<any>(url,data,this.options).pipe();
    }

    public destroySession(){
        localStorage.removeItem('auth_token');
        localStorage.removeItem('attemptLoginUrl');
        localStorage.removeItem('user_email');
        localStorage.removeItem('confirmed_user');
        this.router.navigate(['/landing'],{replaceUrl:true}).then(() => {
            window.location.reload();
        });;
    }

    public getSessionToken(){
        return localStorage.getItem('auth_token');
    }

    public getUserInfo(){
        return this.http.get<any>(global.API_GET_USER_INFO,this.options).pipe();
    }

}
