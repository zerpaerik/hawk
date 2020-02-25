import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { CaseProvider } from 'src/app/providers/case.service';
import { global } from '../../../../global'
import { ActivatedRoute } from '@angular/router';
import { NavigationProvider } from 'src/app/providers/navigation.provider';
import { ResponsiveProvider } from 'src/app/providers/responsive-provider';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { System } from 'src/app/models/system.model';
@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit {
  public original_cases: Array<System> = new Array<System>();
  public cases: Array<System> = new Array<System>();
  public case_data: System = null;
  public num_cols: number = 4;
  public search: string = "";
  public searchedWordsControl = new FormControl('');
  public server_name: string = global.SERVER_NAME;
  public new_case: boolean = false;
  public new_case_filter: any = null;
  public edit: boolean = false;
  public innerWidth: any;

  public searchedWords$: Observable<string[]> = this
    .searchedWordsControl
    .valueChanges
    .pipe(
      map((search: string) => search.trim().split(' '))
    )

  constructor(
    private responsiveProvider: ResponsiveProvider,
    private caseProvider: CaseProvider,
    private routeActivated: ActivatedRoute,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private navigator: NavigationProvider) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.num_cols = this.responsiveProvider.getNumCols(window.innerWidth);
  }

  ngOnInit() {
    this._getCaseList();
    this.routeActivated.queryParams.subscribe(async params => {
      if (params.filter && params.filter !== "null") {
        this.new_case_filter = JSON.parse(params.filter);
        this.new_case = true;
      } else {
        localStorage.removeItem('new_case_data');
      }
    });
  }

  ngAfterViewInit() {
    this.searchedWordsControl.valueChanges.subscribe((changes) => {
      this.cases = this.caseProvider.filterCaseList(this.original_cases,changes);
    })
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    /* Something to do on view leave  */
  }

  _getCaseList() {
    this.caseProvider.getPersonalCases().subscribe(this.setCases);
  }

  setCases = (cases: Array<System>) => {
    this.cases = cases;
    this.cases.map(case_data => case_data.toggle_chart = false);
    this.original_cases = cases;
    this.original_cases.map(case_data => case_data.toggle_chart = false);
    this.num_cols = this.responsiveProvider.getNumCols(window.innerWidth);
  }

  _viewOptimization(case_data) {
    this.navigator._goOptimizationsResults(case_data);
  }

  _refresCaseList() {
    this._getCaseList();
    this.new_case = false;
    this.new_case_filter = null;
    this.navigator._goHomeCasesClear();
  }

  _duplicateCase(study_case) {
    study_case.current_filter.model_filter = study_case.current_filter.model_filter.id;
    this.caseProvider.createNewCase(study_case).subscribe((response) => {
      this._getCaseList();
    }, error => {
      console.log(error);
    })
  }

  cancelNewCase() {
    this.case_data = null
    this.new_case = false;
    this.new_case_filter = null;
    this.edit = false;
    this.location.replaceState(this.location.path().split('?')[0], '');
    localStorage.removeItem('new_case_data');

  }

  _editCase(study_case) {
    console.log(study_case);
    this.new_case = true;
    this.edit = true;
    this.case_data = study_case;
    this.new_case_filter = study_case.current_filter.model_filter;
  }

}
