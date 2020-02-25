import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { global } from  '../global';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { System } from '../models/system.model';
import { SystemFilter } from '../models/system-filter.model';

@Injectable()
export class CaseProvider {
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
        //return "3eca9549f3dc568b6f462feadc41f66a6f65d43f"
    }

    public getPersonalCases():Observable<any>{
        return this.http.get<System>(global.API_CASES,this.options).pipe();
    }

    public getEnergyCosts(data):Observable<any>{
        let url = global.API_GET_ENERGY_COSTS;
        url = url.replace('__zipcode__',data.zip_code);
        url = url.replace('__industry__',data.industry_type);
        return this.http.get<any>(url,this.options).pipe();
    }

    public getDpValues(data):Observable<any>{
        let url = global.API_GET_DP_VALUES;
        url = url.replace('__report__',data.report);
        return this.http.get<any>(url,this.options).pipe();
    }

    public createNewCase(data:System):Observable<any>{
        return this.http.post<System>(
            global.API_CASES,data,this.options).pipe();
    }

    public updateCase(data:System):Observable<any>{
        let url = global.API_EDIT_CASE;
        url = url.replace('__case_id__',data.id.toString());
        return this.http.put<any>(
            url,data,this.options).pipe();
    }

    public getCase(case_id):Observable<any>{
        let url = global.API_GET_CASE_BY_ID;
        url = url.replace('__case_id__',case_id);
        return this.http.get<any>(url,this.options).pipe();
    }

    public getCaseDpVsTimeChart(case_id):Observable<any>{
        let url = global.API_CASE_OPTIMAL_CHART;
        url = url.replace('__case_id__',case_id);
        return this.http.get<any>(url,this.options).pipe();
    }

    public getCaseCostVsTimeChart(case_id):Observable<any>{
        let url = global.API_GET_CASE_CHART_COST;
        url = url.replace('__case_id__',case_id);
        return this.http.get<any>(url,this.options).pipe();
    }

    public filterCaseList(caseList:Array<System>, value:string){
        return caseList.filter(_case =>
            (_case.name.toLowerCase().indexOf(value.toLocaleLowerCase()) !== -1) ||
            (_case.model_filter_name.toLowerCase().indexOf(value.toLocaleLowerCase()) !== -1) ||
            (_case.client_contact_name.toLowerCase().indexOf(value.toLocaleLowerCase()) !== -1) ||
            (_case.client_user_case.toLowerCase().indexOf(value.toLocaleLowerCase()) !== -1))
    }

}
