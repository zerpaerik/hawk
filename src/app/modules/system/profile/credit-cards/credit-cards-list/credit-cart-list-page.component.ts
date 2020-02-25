import { Component, OnInit, Inject } from '@angular/core';
import { PaymentProvider } from 'src/app/providers/payment.service';
import { FilterProvider } from 'src/app/providers/filter.service';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
const moment =  _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-credit-cart-list-page',
  templateUrl: './credit-cart-list-page.component.html',
  styleUrls: ['./credit-cart-list-page.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})


export class CreditCarDListPageComponent implements OnInit {
  date = new FormControl(moment());
  cards_list:any=[];
  create_card:boolean = false;
  card_details:boolean = false;
  new_card:any={};
  toggleOverlayClass:any = [];
  card_error: boolean;
  error_message: any;
  minDate:any;
  constructor(private paymentProvider:PaymentProvider, private filter:FilterProvider,
    private _snackBar: MatSnackBar,public dialog: MatDialog,) { }

  ngOnInit() {
    this.setMinDate();
    this.getCreditCards();
  }
  
  setMinDate(){
    var date = new Date();
    var month = date.getMonth() +1;
    var year = date.getFullYear();
    var day = date.getDate();
    this.minDate = new Date(year , month, day );
    this.initNewCardData();
  }

  initNewCardData(){
    this.new_card = {
      "name":"",
      "number": "",
      "exp_month": this.minDate.getMonth(),
      "exp_year": this.minDate.getFullYear(),
      "cvc": ""
    };
  }


  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.new_card.exp_month = ctrlValue._d.getMonth() +1;
    this.new_card.exp_year = ctrlValue._d.getFullYear();
  }

  getCreditCards(){
    this.paymentProvider.getPaymentMethods().subscribe((response)=>{
      this.cards_list = response;
    },error=>{
      console.log(error);
    })
  }

  newCard(){
    this.create_card = true;
  }

  _saveNewCard(){
    //delete this.new_card.name;
    this.paymentProvider.createNewPaymentMethod(this.new_card).subscribe((response)=>{
      this.getCreditCards();
      console.log(this.new_card);
      this._snackBar.open('New payment method created correctly', 'OK', {
        duration: 5000,
      });
      this.initNewCardData();
      this.create_card = false;      
    },error=>{
      this.card_error = true;
      this.error_message = error.error[0];
      console.log(error)
    })
  }

  _setDefaultCard(card){
    this.paymentProvider.setDefaultPaymentMethod(card).subscribe((response)=>{
      this.getCreditCards();
    },error=>{
      console.log(error);
    })
  }


  _openModalConfirmation(card): void {

    const dialogRef = this.dialog.open(DialogDeleteConfirmation, {
      width: '50%',
      height: '30%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.paymentProvider.deletePaymentMethod(card).subscribe((response)=>{
          console.log(response);
          this.getCreditCards();
          this._snackBar.open('Payment card deleted', 'OK', {
            duration: 5000,
          });
          this._snackBar
        },error=>{
          console.log(error);
        })
      }
    });
    
  }

}

@Component({
  styleUrls: ['./dialog-delete-confirmation.scss'],
  templateUrl: 'dialog-delete-confirmation.html',
})
export class DialogDeleteConfirmation implements OnInit{

  option:any=false;
  
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteConfirmation>) {}

    ngOnInit(){
      console.log('hola');
    }   
    
    onNoClick(): void {
      this.dialogRef.close(false);
    }

    delete():void {
      this.dialogRef.close(true);
    }

   


}
