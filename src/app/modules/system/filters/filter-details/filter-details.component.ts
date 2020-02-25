import { Component, OnInit, Input, Output } from '@angular/core';
import { NavigationProvider } from 'src/app/providers/navigation.provider';

@Component({
  selector: 'app-filter-details',
  templateUrl: './filter-details.component.html',
  styleUrls: ['./filter-details.component.scss']
})
export class FilterDetailsComponent implements OnInit {
  @Input('filter') filter: any;
  public showFilterReports: boolean = false;
  public existing_case: any;
  constructor(private navigator: NavigationProvider) { }

  ngOnInit() {
    this.existing_case = localStorage.getItem("new_case_data");
  }

  _startNewCase() {
    this.navigator._goHomeCases(this.filter);
  }

}
