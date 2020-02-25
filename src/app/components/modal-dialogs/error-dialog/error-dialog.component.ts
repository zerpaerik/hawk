import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {
  private return_data:any={}
  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.return_data = {
      optimize:false,
      value:this.data.message
    }
  }

  edit(){
    this.return_data.optimize = false;
    this.dialogRef.close(this.return_data);
  }

  optimize(){
    this.return_data.optimize = true;
    this.dialogRef.close(this.return_data);
  }

}
