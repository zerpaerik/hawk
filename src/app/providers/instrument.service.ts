import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { global } from  '../global';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Instrument } from '../models/instrument.model';


@Injectable()
export class InstrumentProvider {
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

    public getAllInstrument():Observable<any>{
        return this.http.get<Instrument>(global.API_GET_INSTRUMENT,this.options).pipe();
    }




}
