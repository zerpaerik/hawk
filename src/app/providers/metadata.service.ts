import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { global } from  '../global';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class MetaDataProvider {
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

    public getAllTestLaboratories():Observable<any>{
        return this.http.get<any>(global.API_GET_LABS,this.options).pipe();
    }

    public getAllNorms():Observable<any>{
        return this.http.get<any>(global.API_GET_NORMS,this.options).pipe();
    }

    public getFilterTypes():Observable<any>{
        return this.http.get<any>(global.API_GET_FILTER_TYPE,this.options).pipe();
    }

    public getFrameTypes():Observable<any>{
        return this.http.get<any>(global.API_GET_FRAME_TYPE,this.options).pipe();
    }

    public getMediaTypes():Observable<any>{
        return this.http.get<any>(global.API_GET_MEDIA_TYPE,this.options).pipe();
    }

    public getFrameMaterial():Observable<any>{
        return this.http.get<any>(global.API_GET_FRAME_MATERIAL,this.options).pipe();
    }

    public getDustType():Observable<any>{
        return this.http.get<any>(global.API_GET_DUST_TYPE,this.options).pipe();
    }

    public getProviderType():Observable<any>{
        return this.http.get<any>(global.API_GET_PROVIDER_TYPE,this.options).pipe();
    }

    public getAllManufacturers():Observable<any>{
        return this.http.get<any>(global.API_GET_MANUFACTURERS,this.options).pipe();
    }

}
