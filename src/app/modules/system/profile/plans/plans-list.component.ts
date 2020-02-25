import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PaymentProvider } from 'src/app/providers/payment.service';
import { PaymentDialogComponent } from 'src/app/components/modal-dialogs/payment-dialog/payment-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Plan } from 'src/app/models/plan.model';
import { NavigationProvider } from 'src/app/providers/navigation.provider';

@Component({
  selector: 'app-plans-list',
  templateUrl: './plans-list.component.html',
  styleUrls: ['./plans-list.component.scss']
})
export class PlansListComponent implements OnInit {
  @Output() created = new EventEmitter<boolean>();
  public plans:Array<Plan>;
  constructor(private paymentProvider: PaymentProvider,public dialog: MatDialog, public navigator:NavigationProvider) { }

  ngOnInit() {
    this._getPlansList();
  }

  _getPlansList(){
    this.paymentProvider.getAllSubscriptions().subscribe((response)=>{
      this.plans = response;
    },error=>{
      console.log(error);
    })
  }

  _openPaymentModalDialog(plan): void {

    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '80%',
      height: 'auto',
      data: plan
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this._createSubscription(plan);
      }
    });
  }

  _createSubscription(plan){
    var data = {
      plan:plan.id
    }
    this.paymentProvider.createNewSubscription(data).subscribe((response)=>{
      this.created.emit(true);
    },error=>{
      console.log(error)
    })
  }


}
