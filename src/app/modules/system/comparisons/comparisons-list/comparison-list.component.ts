import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CaseProvider } from 'src/app/providers/case.service';
import { ComparisonProvider } from 'src/app/providers/comparison.service';
import { NavigationProvider } from 'src/app/providers/navigation.provider';

@Component({
  selector: 'app-comparison-list',
  templateUrl: './comparison-list.component.html',
  styleUrls: ['./comparison-list.component.scss']
})
export class ComparisonListComponent implements AfterViewInit {
  new_comparison:boolean=false;
  edit:boolean=false;
  study_cases:any=[];
  selected_case:any;
  constructor(public caseProvider:CaseProvider, public comparisonProvider:ComparisonProvider, public navigator : NavigationProvider) {}

  ngAfterViewInit() {
    this.caseProvider.getPersonalCases().subscribe((response)=>{
      this.study_cases = response;
      this.study_cases = this.study_cases.map(function(e) { 
        e.comparisons = []; 
        return e;
      });
      this.clearSelectedCase();
      this.getAllComparisons();
      console.log(this.study_cases);
    },error=>{
      console.log(error);
    })
  }

  getAllComparisons(){
    for (let index = 0; index < this.study_cases.length; index++) {
      this.getComparisonsForCases(this.study_cases[index].id,index);
    }
    console.log(this.study_cases);
  }

  resetCases(){
    this.new_comparison = false;
    this.clearSelectedCase();
  }

  getComparisonsForCases(id,pos){
    this.comparisonProvider.getCaseComparisons(id).subscribe((response)=>{
      this.study_cases[pos].comparisons = response;
    },error=>{
      console.log(error);
    })
  }
  
  clearSelectedCase(){
    this.study_cases = this.study_cases.map(function(e) { 
      e.selected = false; 
      return e;
    });
  }

  viewComparisonDetails(study_case,comparison){
    let data = {
      case:study_case,
      comparison_data:comparison
    }
    this.navigator._goComparisonResults(data);
  }

}
