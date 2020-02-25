import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UtilsFunctions } from 'src/app/providers/utils.functions';

@Component({
  selector: 'app-replace-cost-dialog',
  templateUrl: './replace-cost-dialog.component.html',
  styleUrls: ['./replace-cost-dialog.component.scss']
})
export class ReplaceCostDialogComponent implements OnInit {
  public array_costs:any=[];
  public invalid_costs: boolean = false;
  constructor(public dialogRef: MatDialogRef<ReplaceCostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public utils: UtilsFunctions) { }
    
    ngOnInit() {
      this.array_costs = this.data.costs;
    }

    newCostRow(){
      var bool =false;
      this.data.type == 'annual' ? bool=true:bool=false;
      this.array_costs.push({
        'name':'',
        'value':'',
        'is_annual':bool,
      })
    }

    getInvalidCost(){
      var empty_cost  = this.array_costs.find(cost => cost.name == "");
      if(empty_cost){
        this.invalid_costs = true;
        return true
      }
    }

    cancel(){
      this.dialogRef.close();
    }

    setAmountDecimal(ev){
      this.utils.transformAmount(ev);
    }

    deleteCostRow(pos){
      this.array_costs.splice(pos,1);
    }

    done(){
      if(!this.getInvalidCost()){
        this.dialogRef.close(this.array_costs);
      }
    }

}
