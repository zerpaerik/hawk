import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { global } from  '../global';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class ComparisonProvider {
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
        return this.http.get<any>(global.API_CASES,this.options).pipe();
    }

    public getCaseComparisons(id):Observable<any>{
        let url = global.API_CASE_COMPARISONS;
        url = url.replace('__case_id__',id);
        return this.http.get<any>(url,this.options).pipe();
    }

    public createNewComparison(data):Observable<any>{
        let url = global.API_CASE_COMPARISONS;
        url = url.replace('__case_id__',data.id);
        return this.http.post<any>(url,data.proposed_filter,this.options).pipe();
    }

    public getComparisonChartDpVsTime(data):Observable<any>{
        let url = global.API_COMPARISON_OPTIMAL_CHART;
        url = url.replace('__filter_id__',data.comparison_data.id);
        return this.http.get<any>(url,this.options).pipe();
    }

    public getComparisonChartCostVsTime(data):Observable<any>{
        let url = global.API_GET_COMPARISON_CHART_COST;
        url = url.replace('__filter_id__',data.comparison_data.id);
        return this.http.get<any>(url,this.options).pipe();
    }

    
}
