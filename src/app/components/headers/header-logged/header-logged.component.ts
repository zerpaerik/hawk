import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { AuthProvider } from 'src/app/providers/auth.service';
import { NavigationProvider } from 'src/app/providers/navigation.provider';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header-logged',
  templateUrl: './header-logged.component.html',
  styleUrls: ['./header-logged.component.scss']
})
export class HeaderLoggedComponent implements OnInit {

  constructor(private authProvider:AuthProvider, private navigator:NavigationProvider, private _snackBar: MatSnackBar) { }
  @Input('active') link_active :any;
  public user_confirmed:any;
  ngOnInit() {
    this.user_confirmed = localStorage.getItem('confirmed_user');
  }

  _logOut(){
    this.authProvider.userLogut().subscribe((response)=>{
     },error=>{
      console.log(error);
    })
  }

  _confirmEmail(){
    this.authProvider.registerUserConfirmation('').subscribe((response)=>{
      if(response.detail == 'mail sent'){
        this._snackBar.open('A confirmation email was sent to confirm your account', 'OK', {
          duration: 5000,
        });
      }
    },error=>{
      console.log(error)
    })
  }

  ngOnChanges(changes: SimpleChanges){}

  _goHome(){
    this.navigator._goHome();
  }
  _goCases(){
    this.navigator._goHomeCases(null);
  }

  _goCompares(){
    this.navigator._goHomeComparisons();
  }

  _goReports(){
    this.navigator._goHome();
  }

  _goFilters(){
    this.navigator._goFilterList();
  }

  _openProfileSettings(){
    this.navigator._goProfile();
  }

  _goLoginSonicu(){
    this.navigator._goLoginSonicu();
  }

  _goInstrument(){
    this.navigator._goInstrumentList();
  }

}
