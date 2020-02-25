import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit {
  @Output() continue = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<boolean>();
  agree:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  _continue(){
    this.continue.emit(true);
  }

  _cancel(){
    this.cancel.emit(false);  
  }

}
