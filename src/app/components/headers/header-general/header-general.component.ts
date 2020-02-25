import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { NavigationProvider } from 'src/app/providers/navigation.provider';

@Component({
  selector: 'app-header-general',
  templateUrl: './header-general.component.html',
  styleUrls: ['./header-general.component.scss']
})
export class HeaderGeneralComponent implements OnInit {
  @Input('active') link_active :any;
  constructor(private navigator:NavigationProvider) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges){
  }

  _goLogin(){
    this.navigator._goLogin();
  }

  _goRegister(){
    this.navigator._goRegister();
  }

  _goLanding(){
    this.navigator._land();
  }

  _uploadFile(){
    this.navigator._goNewReport();
  }

  _goLoginSonicu(){
    this.navigator._goLoginSonicu();
  }

}
