import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { FilterProvider } from 'src/app/providers/filter.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdvancedSearchComponent } from 'src/app/components/modal-dialogs/advanced-search-dialog/advanced-search.component';
import { search_data } from "../../../../mocks/mocks.objects";
import { ResponsiveProvider } from 'src/app/providers/responsive-provider';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Filter } from 'src/app/models/filter.model';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss']
})

export class FilterListComponent implements OnInit {
  public searchedWordsControl = new FormControl('');

  public searchedWords$: Observable<string[]> = this
    .searchedWordsControl
    .valueChanges
    .pipe(
      map((search: string) => search.trim().split(' '))
    )

  private original_filters: Array<Filter> = [];
  private advanced_search_data: any = {};

  public filters: Array<Filter> = new Array<Filter>();
  public filters_search_result: Array<Filter> = [];
  public filter_selected: Filter = new Filter();
  public new_report: boolean = false;
  public showFilterDetails: boolean = false;
  public num_cols: number;
  public search: string = "";
  public texts_to_hightlight: NodeListOf<Element>;

  constructor(
    private filterProvider: FilterProvider,
    private responsiveProvider: ResponsiveProvider,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog) { }


  ngOnInit() {
    this.filterProvider.getAllPublicFilters().subscribe(this.setFilters); 
    this.num_cols = this.responsiveProvider.getNumCols(window.innerWidth);
    Object.assign(this.advanced_search_data, search_data);
  }

  setFilters = (filters: Array<Filter>) => {
    this.filters = filters;
    this.original_filters = filters;
  }

  ngAfterViewInit() {
    this.searchedWordsControl.valueChanges.subscribe((changes) => {
      this.filters = this.filterProvider.filterFilterList(this.original_filters, changes);
    })
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.num_cols = this.responsiveProvider.getNumCols(window.innerWidth);
  }

  _openSearchModal(): void {
    const dialogRef = this.dialog.open(AdvancedSearchComponent, {
      width: '70%',
      height: '90%',
      data: this.advanced_search_data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.data) {
        Object.assign(this.advanced_search_data, result.data);
        console.log(this.advanced_search_data);
        this.filters = result.filters;
        this.filters_search_result = result.filters;
      }
    });
  }

  clearFiltersFilter() {
    this.filters = this.original_filters;
    Object.assign(this.advanced_search_data, search_data);
    this.filters_search_result = [];
    console.log(this.advanced_search_data);
  }

  _openFilterDetails(filter) {
    this.filter_selected = filter;
    this.showFilterDetails = true;
  }

}
