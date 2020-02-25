import { Component, OnInit } from '@angular/core';
import { NavigationProvider } from 'src/app/providers/navigation.provider';
import { ActivatedRoute } from '@angular/router';
import { CaseProvider } from 'src/app/providers/case.service';
import { System } from 'src/app/models/system.model';

@Component({
  selector: 'app-optimization-results',
  templateUrl: './optimization-results.component.html',
  styleUrls: ['./optimization-results.component.scss']
})
export class OptimizationResultsComponent implements OnInit {
  selected_data: any[];

  constructor(private navigator:NavigationProvider, private routeActivated:ActivatedRoute, private caseProvider:CaseProvider ) { }
  public case_data: System = new System;
  public type_of_chart:any = 1;
  public type_savings_chart:any = 'bar';
  public dp_vs_time_data:any = null;
  public cost_vs_time_data:any = null;
  public range_value:any='';
  public range_limit:any='';
  public limit_dp:any='';
  ngOnInit() {
    this.routeActivated.queryParams.subscribe(async params  => {
      this.case_data = JSON.parse(params.case);
      this.limit_dp = this.case_data.maximum_operational_dp;
      this._calculateSavings();
      this.caseProvider.getCaseDpVsTimeChart(this.case_data.id).subscribe((response)=>{
        this.dp_vs_time_data = response.dp_vs_t_w_optimized_graph_current_filter;
        this.range_limit = this.dp_vs_time_data.length-1;
        this._getOptimalDpVsTimePosition();
      },error=>{
        console.log(error);
      })
      this.caseProvider.getCaseCostVsTimeChart(this.case_data.id).subscribe((response)=>{
        this.cost_vs_time_data = response;
      },error=>{
        console.log(error);
      })
    });
  }
  
  _backToCaseList(){
    this.navigator._goHomeCases(null);
  }
  
  _startNewCase(){
    this.navigator._goHomeCases(this.case_data.current_filter.model_filter);
  }

  _calculateSavings(){
    this.case_data.savings  =  
    this.case_data.current_filter.change_rate_annual_cost -
    this.case_data.current_filter.optimize_change_rate_annual_cost 
    
    this.case_data.savings_percent = 
    (this.case_data.savings * 100) / (this.case_data.current_filter.change_rate_annual_cost)
  }

  _getOptimalDpVsTimePosition(){
    this.selected_data = this.dp_vs_time_data.find(a=>a.time.toFixed(2) > this.case_data.current_filter.optimize_change_rate_cycle_time.toFixed(2));
    var i = this.dp_vs_time_data.indexOf(this.selected_data);
    this.range_value = i;
  }

  _getOptimalCostVsTimePosition(){
    this.selected_data = this.cost_vs_time_data.find(a=>a.is_optimal);
    var i = this.cost_vs_time_data.indexOf(this.selected_data);
    this.range_value = i;
  }

  _changeTypeOfChart(type){
    this.type_of_chart = type;
    this.selected_data = null;
    if(type == 1){
      this.range_limit = this.dp_vs_time_data.length -1;
      this._getOptimalDpVsTimePosition();
    }else{
      this.range_limit = this.cost_vs_time_data.length -1;
      this._getOptimalCostVsTimePosition();
    }
  }

  public _previewPdf():void{
    this.navigator._goPdfPreview(this.case_data,this.cost_vs_time_data);
  }

  _setRange(){
    this.selected_data = this.dp_vs_time_data[this.range_value];
  }

  _setCostRange(){
    this.selected_data = this.cost_vs_time_data[this.range_value];
  }

}
