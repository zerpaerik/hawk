import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { global } from  '../global';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Filter } from '../models/filter.model';

@Injectable()
export class FilterProvider {
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

    public getAllPublicFilters():Observable<any>{
        return this.http.get<Filter>(global.API_GET_ALL_FILTERS,this.options).pipe();
    }

    public getPersonalFilters():Observable<any>{
        return this.http.get<Filter>(global.API_GET_FILTERS,this.options).pipe();
    }

    public filterFilterList(filterList:Array<Filter>, search_value:string){
        return filterList.filter( _filter =>
            (_filter.name.toLowerCase().indexOf(search_value.toLocaleLowerCase()) !== -1) || 
            (_filter.manufacturer.name.toLowerCase().indexOf(search_value.toLocaleLowerCase()) !== -1));
    }

    public searchFilters(data,part_url):Observable<any>{
        let url = global.API_SEARCH_FILTERS;
        if(part_url.length > 1){
            part_url = part_url + "&"
        }
        url = url.replace('__part_url__',part_url);
        data.name !== "" ?  url = url.replace('__name__',data.name) : url = url.replace('name=__name__&','');
        data.part_number !== "" ?url = url.replace('__part_number__',data.part_number) : url = url.replace('part_number=__part_number__&','');
        data.size_depth_min !== "" ? url = url.replace('__size_depth_min__',data.size_depth_min) : url = url.replace('size_depth_min=__size_depth_min__&','');
        data.size_depth_max !== "" ? url = url.replace('__size_depth_max__',data.size_depth_max) : url = url.replace('size_depth_max=__size_depth_max__&','');
        data.size_width_min !== "" ? url = url.replace('__size_width_min__',data.size_width_min) : url = url.replace('size_width_min=__size_width_min__&','');
        data.size_width_max !== "" ? url = url.replace('__size_width_max__',data.size_width_max) : url = url.replace('size_width_max=__size_width_max__&','');
        data.size_height_min !== "" ? url = url.replace('__size_height_min__',data.size_height_min) : url = url.replace('size_height_min=__size_height_min__&','');
        data.size_height_max !== "" ? url = url.replace('__size_height_max__',data.size_height_max) : url = url.replace('size_height_max=__size_height_max__&','');
        data.max_press_drop_min !== "" ? url = url.replace('__max_press_drop_min__',data.max_press_drop_min) : url = url.replace('max_press_drop_min=__max_press_drop_min__&','');
        data.max_press_drop_max !== "" ? url = url.replace('__max_press_drop_max__',data.max_press_drop_max) : url = url.replace('max_press_drop_max=__max_press_drop_max__&','');
        data.efficiency_max !== "" ? url = url.replace('__efficiency_max__',data.efficiency_max) : url = url.replace('efficiency_max=__efficiency_max__&','');
        data.efficiency_min !== "" ? url = url.replace('__efficiency_min__',data.efficiency_min) : url = url.replace('efficiency_min=__efficiency_min__&','');
        data.test_airflow_max !== "" ? url = url.replace('__test_airflow_max__',data.test_airflow_max) : url = url.replace('test_airflow_max=__test_airflow_max__&','');
        data.test_airflow_min !== "" ? url = url.replace('__test_airflow_min__',data.test_airflow_min) : url = url.replace('test_airflow_min=__test_airflow_min__&','');
        data.pdf_date_max !== "" ? url = url.replace('__pdf_date_max__',data.pdf_date_max) : url = url.replace('pdf_date_max=__pdf_date_max__&','');
        data.pdf_date_min !== "" ? url = url.replace('__pdf_date_min__',data.pdf_date_min) : url = url.replace('pdf_date_min=__pdf_date_min__&','');
        data.e1_max !== "" ? url = url.replace('__e1_max__',data.e1_max) : url = url.replace('e1_max=__e1_max__&','');
        data.e1_min !== "" ? url = url.replace('__e1_min__',data.e1_min) : url = url.replace('e1_min=__e1_min__&','');
        data.e2_max !== "" ? url = url.replace('__e2_max__',data.e2_max) : url = url.replace('e2_max=__e2_max__&','');
        data.e2_min !== "" ? url = url.replace('__e2_min__',data.e2_min) : url = url.replace('e2_min=__e2_min__&','');
        data.e3_max !== "" ? url = url.replace('__e3_max__',data.e3_max) : url = url.replace('e3_max=__e3_max__&','');
        data.e3_min !== "" ? url = url.replace('__e3_min__',data.e3_min) : url = url.replace('e3_min=__e3_min__','');
        if(url[url.length-1] == "&"){
            url = url.substring(0, url.length - 1);
        }
        return this.http.get<Filter>(url,this.options).pipe();
    }
}
