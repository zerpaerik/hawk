import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
@Component({
  selector: 'app-gauge-component',
  templateUrl: './gauge-component.component.html',
  styleUrls: ['./gauge-component.component.scss']
})
export class GaugeComponentComponent implements OnInit {
  @Input('value') value:number;
  @Output() share = new EventEmitter<number>();;
  public gaugeValue:any;
  constructor() { }

  ngOnInit() {
    this.gaugeValue = this.value;
  }

  changeValue(){
    this.share.emit(this.gaugeValue);
  }

}
