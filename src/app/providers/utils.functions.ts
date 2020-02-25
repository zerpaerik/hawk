import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { global } from  '../global';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
  
@Injectable()
  export class UtilsFunctions {
    header:any;
    options:any;
    requestHeaders:any;
    constructor(private http: HttpClient, private router:Router) {}
  
    transformAmount(element: any){
        element.target.value = parseFloat(element.target.value).toFixed(2);
        return element;
    }
    
    replaceNumber(element:any){
        element.target.value = '';
        element.target.placeholder='0.00';
        return element
    }      
  
}
  