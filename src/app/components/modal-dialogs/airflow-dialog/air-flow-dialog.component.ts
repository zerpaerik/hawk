import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UtilsFunctions } from 'src/app/providers/utils.functions';

@Component({
  selector: 'airflow-dialog',
  styleUrls: ['./air-flow-dialog.component.scss'],
  templateUrl: 'air-flow-dialog.component.html',
})
export class AirFlowDialogComponent implements OnInit{
  public total_airflow_error:boolean=false;
  public negative_value_error: boolean;
  constructor(
    public dialogRef: MatDialogRef<AirFlowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public utils : UtilsFunctions) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  
  ngOnInit(){
    if(this.data.length == 1){
      this.data[1] = {'flow':parseFloat('0').toFixed(2),'percent':0};
      this.data[2] = {'flow':parseFloat('0').toFixed(2),'percent':0};
      this.data[3] = {'flow':parseFloat('0').toFixed(2),'percent':0};
    }
    if(this.data.length == 2){
      this.data[2] = {'flow':parseFloat('0').toFixed(2),'percent':0};
      this.data[3] = {'flow':parseFloat('0').toFixed(2),'percent':0};
    }
    if(this.data.length == 3){
      this.data[3] = {'flow':parseFloat('0').toFixed(2),'percent':0};
    }
  }   

  setAmountDecimal(ev){
    this.utils.transformAmount(ev);
  }
  
  done():void {
    let sum_airflow = this.data.reduce((a, b) => +a + +b.percent, 0);
    if(sum_airflow != 100){
      this.total_airflow_error = true;
    }else if(this.data[0].percent < 0 || this.data[1].percent < 0 || this.data[2].percent < 0 || this.data[3].percent < 0){
      this.negative_value_error = true;
    }else{
      let average_airflow = this.data.reduce((a, b) => +a + +(b.flow * (b.percent/100)), 0).toFixed(2);
  
      let return_data = {
        flows:this.data,
        average:average_airflow
      }
      this.dialogRef.close(return_data);
    }
  }
  
}



