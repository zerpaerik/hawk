import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { global } from  '../global';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class PaymentProvider {
    header:HttpHeaders;
    options:any;
    token:any;
    requestHeaders:any;
    constructor(private http: HttpClient, private router:Router) {
        
        let token = this.getSessionToken();
        this.requestHeaders = new  HttpHeaders()
            .set('Accept', 'application/json')
            .set("Authorization","token "+ token)
        this.options = {
            headers: this.requestHeaders
        }
    }

    public getSessionToken(){
        return localStorage.getItem('auth_token');
    }

    public getPaymentMethods():Observable<any>{
        return this.http.get<any>(global.API_PAYMENT_METHODS,this.options).pipe();
    }

    public createNewPaymentMethod(data):Observable<any>{
        return this.http.post<any>(
            global.API_PAYMENT_METHODS,data,this.options).pipe();
    }

    public deletePaymentMethod(data):Observable<any>{
        let url = global.API_PAYMENT_METHOD_DELETE;
        url = url.replace('__payment_id__',data.id);
        return this.http.delete<any>(url,this.options).pipe();
    }

    public setDefaultPaymentMethod(data):Observable<any>{
        let url = global.API_SET_DEFAULT_PAYMENT;
        url = url.replace('__payment-method__',data.id);
        return this.http.post<any>(url,data,this.options).pipe();
    }

    

    public getAllSubscriptions():Observable<any>{
        return this.http.get<Subscription>(global.API_SUBSCRIPTION_PLANS,this.options).pipe();
    }

    public getUserSubscriptions():Observable<any>{
        return this.http.get<Subscription>(global.API_USER_SUBSCRIPTIONS,this.options).pipe();
    }

    public createNewSubscription(data):Observable<any>{
        return this.http.post<Subscription>(
            global.API_USER_SUBSCRIPTIONS,data,this.options).pipe();
    }

    public deleteUserSubscription(data):Observable<any>{
        let url = global.API_DELETE_USER_SUBSCRIPTIONS;
        url = url.replace('__plan_id__',data.id);
        return this.http.delete<Subscription>(url,this.options).pipe();
    }

}
