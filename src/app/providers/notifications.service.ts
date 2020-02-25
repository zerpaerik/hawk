import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
  
@Injectable()
  export class NotificationService {
    header:any;
    options:any;
    requestHeaders:any;
    constructor(private _snackBar: MatSnackBar,) {}
    
    showNotification(message:string,action:string,duration:number){
        this._snackBar.open(message, action, {
            duration: duration,
        });
    }
  
}
  