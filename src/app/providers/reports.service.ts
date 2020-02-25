import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { global } from  '../global';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class ReportsProvider {
    header:HttpHeaders;
    options:any;
    token:any;
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

    public getSessionToken(){
        return localStorage.getItem('auth_token');
    }

    public getReports():Observable<any>{
        return this.http.get<any>(global.API_GET_REPORTS_LIST,this.options).pipe();
    }

    public sendPDF(file){
        var headers = new Headers();
        headers.append('Accept', 'application/json');
        var fd = new FormData();
        fd.append('pdf_file', file);
        return this.http.post(
            global.API_UPLOAD_PDF_REPORT, 
            fd,
            this.options
        ).pipe();
    }

    public getReportsByFilterName(reports_array:Array<any>,filter_name:string){
        var array = [];
        for(var i=0; i<reports_array.length;i++){
            if((reports_array[i].model_filter) && (reports_array[i].model_filter === filter_name)){
                array.push(reports_array[i])
            }
        }
        return array;
    }
}
