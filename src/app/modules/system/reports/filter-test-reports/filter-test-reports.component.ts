import { Component, OnInit, Input } from '@angular/core';
import { Report } from 'src/app/models/report.model';
import { PdfViewerComponent } from 'src/app/components/modal-dialogs/pdf-viewer/pdf-viewer.component';
import { MatDialog } from '@angular/material/dialog';

const ELEMENT_DATA: Report[] = [];

@Component({
  selector: 'app-filter-test-reports',
  templateUrl: './filter-test-reports.component.html',
  styleUrls: ['./filter-test-reports.component.scss']
})
export class FilterTestReportsComponent implements OnInit {
  @Input('reports') reports: any;
  displayedColumns: string[] = ['number', 'created', 'laboratory', 'efficiency', 'status'];
  dataSource = ELEMENT_DATA;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = this.reports;
  }

  _openPdfReport(row){
    this.dialog.open(PdfViewerComponent, {
      width: '65%',
      height: '98%',
      data: row.pdf_file
    });
  }

}
