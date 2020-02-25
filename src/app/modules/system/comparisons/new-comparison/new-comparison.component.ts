import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterProvider } from 'src/app/providers/filter.service';
import { ComparisonProvider } from 'src/app/providers/comparison.service';
import { AdvancedSearchComponent } from 'src/app/components/modal-dialogs/advanced-search-dialog/advanced-search.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { search_data } from "../../../../mocks/mocks.objects";
import { ReplaceCostDialogComponent } from 'src/app/components/modal-dialogs/replace-cost-dialog/replace-cost-dialog.component';
import { UtilsFunctions } from 'src/app/providers/utils.functions';

@Component({
  selector: 'app-new-comparison',
  templateUrl: './new-comparison.component.html',
  styleUrls: ['./new-comparison.component.scss']
})
export class NewComparisonComponent implements OnInit {
  @Input('cases') cases:any;
  @Input('case') selected_case:any;
  @Output() cancel = new EventEmitter<boolean>();
  clear_data = {
    filter_type:[],
    frame_type:[],
    dust_type:[],
    frame_material:[],
    manufacturers:[],
    media_type:[],
    provider:[],
    standard:[],
    labs:[],
    has_face_screen:false,
    is_incinerable:false,
    name:'',
    part_number:'',
    size_depth_min:'',
    size_depth_max:'',
    size_width_min:'',
    size_width_max:'',
    size_height_min:'',
    size_height_max:'',
    max_press_drop_min:'',
    max_press_drop_max:'',
    efficiency_max:'',
    efficiency_min:'',
    test_airflow_max:'',
    test_airflow_min:'',
    pdf_date_max:'',
    pdf_date_min:'',
    e1_max:'',
    e1_min:'',
    e2_max:'',
    e2_min:'',
    e3_max:'',
    e3_min:'',
    is_private:false,
  }
  advanced_search_data = search_data;
  title = 'angularowlslider';
  proposed_filter:any = {};
  step:any=1;
  customOptions: any = {
    loop: true,
    responsiveClass:true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 10, 
    navText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  original_filters:any=[];
  filters: any;
  original_case: any;
  filters_search_result: any=[];
  additional_costs: any;
  annual_cost: any;

  constructor(
    private filterProvider:FilterProvider, 
    private utils : UtilsFunctions,
    public comparisonProvider:ComparisonProvider,
    public dialog: MatDialog) {}

  ngOnInit() {
    if(this.selected_case){
      this.original_case = this.selected_case;
    }else{
      this.setDefaultCaseSelected();
    }
    this._getFilters();
  }

  _getFilters(){
    this.filterProvider.getAllPublicFilters().subscribe((response)=>{
      this.original_filters = response;
      this.filters = response;
      this.setDefaultFilterSelected();
      
    },error=>{
      console.log(error);
    })
  }

  setDefaultFilterSelected(){
    this.filters = this.filters.map(function(e) { 
      e.selected = false; 
      return e;
    });
  }

  setDefaultCaseSelected(){
    this.original_case = null;
    this.cases = this.cases.map(function(e) { 
      e.selected ? e.selected = true : e.selected = false; 
      return e;
    });
  }

  clearSelectedCase(){
    this.cases = this.cases.map(function(e) { 
      e.selected = false; 
      return e;
    });
  }

  setProposedFilter(filter, index){
    this.setDefaultFilterSelected();
    this.filters[index].selected = true;
    this.proposed_filter = filter;  
    this.additional_costs = [
      {'name':'LABOR COST','value': parseFloat('0').toFixed(2),'is_annual':false},
      {'name':'DISPOSAL COST','value':parseFloat('0').toFixed(2) ,'is_annual':false},
      {'name':'FREIGHT COST','value': parseFloat('0').toFixed(2),'is_annual':false},
    ];
    this.annual_cost = [
      {'name':'','value': parseFloat('0').toFixed(2),'is_annual':true},
    ];
    this.proposed_filter.labor_cost = parseFloat('0').toFixed(2);
    this.proposed_filter.disposal_cost = parseFloat('0').toFixed(2);
    this.proposed_filter.freight_cost = parseFloat('0').toFixed(2);
    this.proposed_filter.annual_cost = parseFloat('0').toFixed(2);
    this.updateCosts();
    console.log(this.proposed_filter);
  }

  setOriginalCase(study_case, index){
    this.clearSelectedCase();
    this.cases[index].selected = true;
    this.original_case = study_case;  
  }

  setAmountDecimal(ev){
    this.utils.transformAmount(ev);
  }
  

  clearProposedFilter(){
    this.setDefaultFilterSelected();
    this.proposed_filter=null;
    this.step = 1;
  }

  unMarkCase(index){
    this.original_case = null;
    this.cases[index].selected = false;
  }

  continue(){
    this.step = 2;
  }

  _cancel(){
    this.setDefaultCaseSelected();
    this.cancel.emit(false);
  }

  _openSearchModal():void{
    const dialogRef = this.dialog.open(AdvancedSearchComponent, {
      width: '70%',
      height: '90%',
      data: this.advanced_search_data
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result.data){
        this.advanced_search_data = result.data;
        this.filters = result.filters;
        this.filters_search_result = result.filters;
      }
    });    
  }
  
  compare(){
    this.proposed_filter.model_filter = this.proposed_filter.id;
    this.original_case.proposed_filter = this.proposed_filter;
    let comparison_data = this.original_case;
    comparison_data.proposed_filter.replace_cost = this.proposed_filter.labor_cost;
    console.log(comparison_data);
    this.comparisonProvider.createNewComparison(comparison_data).subscribe((response)=>{
      console.log(response);
    },error=>{
      console.log(error);
    })
  }
  
  clearFiltersFilter(){
    this.filters = this.original_filters;
    this.advanced_search_data = Object.assign(this.advanced_search_data, this.clear_data); 
    this.filters_search_result = [];
  }

  updateCosts(){
    console.log(this.proposed_filter);
    this.additional_costs[0].value = this.proposed_filter.labor_cost;
    this.additional_costs[1].value = this.proposed_filter.disposal_cost;
    this.additional_costs[2].value = this.proposed_filter.freight_cost;
    this.proposed_filter.additional_costs = this.additional_costs.reduce((a, b) => +a + +b.value, 0).toFixed(2);
  }

  addMoreCostPerCycle(){
    let costs_data = {
      costs:this.additional_costs,
      type:'cycle'
    }
    const dialogRef = this.dialog.open(ReplaceCostDialogComponent, {
      width: '50%',
      height: '70%',
      data: costs_data
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.additional_costs = result;
        this.proposed_filter.labor_cost = this.additional_costs[0].value;
        this.proposed_filter.disposal_cost = this.additional_costs[1].value;
        this.proposed_filter.freight_cost = this.additional_costs[2].value;
        this.proposed_filter.additional_costs = result.reduce((a, b) => +a + +b.value, 0).toFixed(2);
        if(this.annual_cost.length > 0){
          this.proposed_filter.filter_extra_cost = this.additional_costs.concat(this.annual_cost);
        }else{
          this.proposed_filter.filter_extra_cost = this.additional_costs;   
        }
      } 
    });
  }

  addAnnualCosts(){
    let costs_data = {
      costs:this.annual_cost,
      type:'annual'
    }
    const dialogRef = this.dialog.open(ReplaceCostDialogComponent, {
      width: '50%',
      height: '70%',
      data: costs_data
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.annual_cost = result;
        this.proposed_filter.annual_cost = result.reduce((a, b) => +a + +b.value, 0).toFixed(2);
        this.proposed_filter.filter_extra_cost = this.annual_cost.concat(this.additional_costs);
      }
    });
  }


}
