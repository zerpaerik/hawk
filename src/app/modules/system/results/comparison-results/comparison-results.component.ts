import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComparisonProvider } from 'src/app/providers/comparison.service';
import { CaseProvider } from 'src/app/providers/case.service';

@Component({
  selector: 'app-comparison-results',
  templateUrl: './comparison-results.component.html',
  styleUrls: ['./comparison-results.component.scss']
})
export class ComparisonResultsComponent implements OnInit {
  result_data: any;
  comparison_dp_vs_time_charts:any=null;
  proposed_filter_cost_vs_time_chart:any=null;
  current_filter_cost_vs_time_chart:any=null;
  range_value:any='';
  range_value_proposed_filter:any='';
  range_limit:any='';
  selected_data: any;
  selected_data_proposed_filter: any;
  range_limit_proposed_filter: number;
  scale:any={
    use:false,
    limit_x:null,
    limit_y:null
  }
  savings:any={};
  show_same_scale: any=false;
  constructor(public routeActivated: ActivatedRoute, public comparisonProvider:ComparisonProvider, public caseProvider:CaseProvider) { }

  ngOnInit() {
    this.routeActivated.queryParams.subscribe(async params => {
      this.result_data = JSON.parse(params.comparison_data);
      this.calculateSavings();
    })
    // this.comparisonProvider.getComparisonChartDpVsTime(this.result_data).subscribe((response)=>{
    //   this.comparison_dp_vs_time_charts = response;
    // },error=>{
    //   console.log(error);
    // });
    
    this.addWithAsync();
  }

  async addWithAsync() {
    this._getCurrentFilterChart();
    await this._getProposedFilterChart();
    this.calculateMaxAxes();
  }


  _getCurrentFilterChart(){
      this.caseProvider.getCaseCostVsTimeChart(this.result_data.case.id).subscribe((response)=>{
        this.current_filter_cost_vs_time_chart = response;
        this.selected_data = this.current_filter_cost_vs_time_chart.find(a=>a.is_optimal);
        this.range_limit = this.current_filter_cost_vs_time_chart.length-1;
        var i = this.current_filter_cost_vs_time_chart.indexOf(this.selected_data);
        this.range_value = i;
      },error=>{
        console.log(error);
      });
  }

  _getProposedFilterChart(){
    return new Promise(resolve => {
      this.comparisonProvider.getComparisonChartCostVsTime(this.result_data).subscribe((response)=>{
        this.proposed_filter_cost_vs_time_chart = response;
        this.selected_data_proposed_filter = this.proposed_filter_cost_vs_time_chart.find(a=>a.is_optimal);
        this.range_limit_proposed_filter = this.proposed_filter_cost_vs_time_chart.length-1;
        var i = this.proposed_filter_cost_vs_time_chart.indexOf(this.selected_data_proposed_filter);
        this.range_value_proposed_filter = i;
        resolve(true);
      },error=>{
        console.log(error);
      });
    });
  }

  _setRange(){
    this.selected_data = this.current_filter_cost_vs_time_chart[this.range_value];
  }

  _setRangeProposedFilter(){
    this.selected_data_proposed_filter = this.proposed_filter_cost_vs_time_chart[this.range_value_proposed_filter];
  }


  calculateSavings(){
    this.savings.current_savings = 
      (this.result_data.case.current_filter.change_rate_annual_cost -
      this.result_data.comparison_data.optimize_change_rate_annual_cost).toFixed(2)
  }

  calculateMaxAxes(){
    if(this.current_filter_cost_vs_time_chart && this.proposed_filter_cost_vs_time_chart){
      this.scale.limit_x = this.getLimitX();
    }
  }

  getLimitX(){
    var limit = null;
    if(this.current_filter_cost_vs_time_chart[this.current_filter_cost_vs_time_chart.length - 1] >
    this.proposed_filter_cost_vs_time_chart[this.proposed_filter_cost_vs_time_chart.length - 1]){
      limit = this.current_filter_cost_vs_time_chart[this.current_filter_cost_vs_time_chart.length - 1].change_out_time
    }else{
      limit = this.current_filter_cost_vs_time_chart[this.current_filter_cost_vs_time_chart.length - 1].change_out_time
    }
    return limit 
  }

  setYaxesLimit(event){
    this.scale.limit_y > event ? this.scale.limit_y : this.scale.limit_y = event;
  }

  renderScale(){}

  toggleScale(){
    var scale = {
      use:this.show_same_scale,
      limit_x : this.scale.limit_x,
      limit_y : this.scale.limit_y
    }
    this.scale = scale;
  }

}
