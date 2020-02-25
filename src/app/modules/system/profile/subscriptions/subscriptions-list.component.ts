import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PaymentProvider } from 'src/app/providers/payment.service';
import { ConfirmDialogComponent } from 'src/app/components/modal-dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscriptions } from 'src/app/models/user_subscriptions';

@Component({
  selector: 'app-subscriptions-list',
  templateUrl: './subscriptions-list.component.html',
  styleUrls: ['./subscriptions-list.component.scss']
})
export class SubscriptionsListComponent implements OnInit {
  @Output() show_plans = new EventEmitter<boolean>();
  public user_subscriptions: Array<Subscriptions>;
  constructor(private paymentProvider: PaymentProvider, public dialog:MatDialog) { }

  ngOnInit() {
    this._getUserSubscriptions();
  }

  _getUserSubscriptions(){
    this.paymentProvider.getUserSubscriptions().subscribe((response)=>{
      this.user_subscriptions = response;
      this._setDates();
    },error=>{
      console.log(error);
    })
  }

  _listPlans(){
    this.show_plans.emit(true);
  }

  _setDates(){
    //this.user_subscriptions.map(user_subscription=>user_subscription.created= new Date(user_subscription.created*1000));
  }

  _deleteSubscription(subscription){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '50%',
      height: 'auto',
      data: 'subscription'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this._removeSubscription(subscription);
      }
    });
  }

  _removeSubscription(subscription){
    this.paymentProvider.deleteUserSubscription(subscription).subscribe((response)=>{
      this._getUserSubscriptions();
    },error=>{
      console.log(error);
    })
  }

}
