import { Component, OnInit, HostListener, ChangeDetectorRef , ViewChild} from '@angular/core';
import { InstrumentProvider } from 'src/app/providers/instrument.service';
import { NavigationProvider } from 'src/app/providers/navigation.provider';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { AdvancedSearchComponent } from 'src/app/components/modal-dialogs/advanced-search-dialog/advanced-search.component';
import { search_data } from 'src/app/mocks/mocks.objects';
import { ResponsiveProvider } from 'src/app/providers/responsive-provider';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Instrument } from 'src/app/models/instrument.model';
import { AuthSonicuProvider } from 'src/app/providers/authsonicu.service';
'@angular/router';
import {Router} from '@angular/router';



@Component({
  selector: 'app-instrument-list',
  templateUrl: './instrument-list.component.html',
  styleUrls: ['./instrument-list.component.scss']
})

export class InstrumentComponent implements OnInit {
  public searchedWordsControl = new FormControl('');

  displayedColumns: string[] = ['id', 'serial_number', 'name', 'unit', 'type', 'status'];

  public searchedWords$: Observable<string[]> = this
    .searchedWordsControl
    .valueChanges
    .pipe(
      map((search: string) => search.trim().split(' '))
    )

  private original_instrument: Array<Instrument> = [];
  private advanced_search_data: any = {};
  public num_cols: number;
  public search: string = "";
  public texts_to_hightlight: NodeListOf<Element>;
  public instrument: Array<Instrument>;
  public instrument_search_result: Array<Instrument> = [];
  public instrument_selected: Instrument = new Instrument();
  public showInstrument: boolean = false;
  public loginDataSonicu: any = {};


  constructor(
    private instrumentProvider: InstrumentProvider,
    private responsiveProvider: ResponsiveProvider,
    private cdr: ChangeDetectorRef,
    private navigator: NavigationProvider,
    private myRoute: Router,
    private authService: AuthSonicuProvider,
    public dialog: MatDialog) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {

    this.instrumentProvider.getAllInstrument().subscribe(instrument => this.setInstrument(instrument));
    Object.assign(this.advanced_search_data, search_data);
  }

  setInstrument = (instrument: Array<Instrument>) => {
    this.instrument = instrument;
    this.original_instrument = this.instrument;
  }

  _startNewCase() {
    this.navigator._goHomeCases(this.instrument);
  }

}
