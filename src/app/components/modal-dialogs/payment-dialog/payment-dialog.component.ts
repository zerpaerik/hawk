import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentProvider } from 'src/app/providers/payment.service';
import { MatSelectionList, MatSelectionListChange, MatListOption } from '@angular/material';
@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent implements OnInit {
  @ViewChild(MatSelectionList,{static:true}) payments: MatSelectionList;
  public payment_methods:any;
  public payment_selected: any;
  public panelOpenState:boolean=false;
  constructor(
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private paymentProvider:PaymentProvider) { }

  ngOnInit() {
    this.paymentProvider.getPaymentMethods().subscribe((response)=>{
      this.payment_methods = response;
      this.payment_selected = this.getDefaultPayment();
    },error=>{
      console.log(error);
    })

    this.payments.selectionChange.subscribe((s: MatSelectionListChange) => {    
      this.payment_selected = s.option.value;         
      this.payments.deselectAll();
      s.option.selected = true;
    });
  }

  cancel(){
    this.dialogRef.close(false);
  }

  pay(){
    this.dialogRef.close(true);
  }

  getDefaultPayment(){
    return this.payment_methods.find(payment => payment.is_default);
  }

}
