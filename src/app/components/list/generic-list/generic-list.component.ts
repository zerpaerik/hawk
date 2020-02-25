import { Component, OnInit, Input } from '@angular/core';
import { Filter } from 'src/app/models/filter.model';
import { element } from 'protractor';

@Component({
  selector: 'app-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.scss']
})
export class GenericListComponent implements OnInit {
  @Input('elements') objects : Array<any>; 
  constructor() { 
  }
  
  ngOnInit() {
    let filter = new Filter;
    console.log(this.objects[0] instanceof Filter);
  }

}
