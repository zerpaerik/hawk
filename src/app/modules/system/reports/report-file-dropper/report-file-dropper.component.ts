import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileHandle } from 'src/app/directives/dragDrop.directive';
import { ReportsProvider } from 'src/app/providers/reports.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-report-file-dropper',
  templateUrl: './report-file-dropper.component.html',
  styleUrls: ['./report-file-dropper.component.scss']
})
export class ReportFileDropperComponent implements OnInit {
  @Output() done = new EventEmitter<boolean>();
  public file_to_upload: any;
  public confirm_view: boolean = false;
  public error_title: string;
  public snack_message: string;
  public error_file: boolean;
  public new_report: boolean = false;
  constructor(private reportProvider: ReportsProvider, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    window.addEventListener("dragover", e => {
      e && e.preventDefault();
    }, false);
    window.addEventListener("drop", e => {
      e && e.preventDefault();
    }, false);
  }

  _filesDropped(files: FileHandle[]): void {
    if (files[0]) {
      if (files[0].file.type != "application/pdf") {
        this.setErrorFile();
      } else {
        this.file_to_upload = files[0].file;
        console.log(this.file_to_upload);
        this.confirm_view = true;
      }
    }
  }

  fileSelectedChange(ev) {
    if (ev.target.files[0].type != "application/pdf") {
      this.setErrorFile();
    } else {
      this.file_to_upload = ev.target.files[0];
      this.confirm_view = true;
    }
  }

  setErrorFile() {
    this.error_title = "File not supported"
    this.snack_message = "Make sure that the file you are trying to upload is a 'PDF' document"
    this.error_file = true;
    this.showSnackNotification(5000);
  }

  _sendReport() {
    this.reportProvider.sendPDF(this.file_to_upload).subscribe((response) => {
      //this._newReport(response);
      this.snack_message = "Your report is now under validation. We'll notice about your report status"
      this.file_to_upload = '';
      this.showSnackNotification(10000);
      this.done.emit(false);
    }, error => {
      console.log(error);
    })
  }

  showSnackNotification(time) {
    this._snackBar.open(this.snack_message, 'OK', {
      duration: time,
    });
  }

  _clearFile() {
    this.file_to_upload = '';
    this.confirm_view = false;
  }
}
