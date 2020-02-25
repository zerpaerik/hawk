import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NavigationProvider } from 'src/app/providers/navigation.provider';
import { AuthProvider } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-recover-password-page',
  templateUrl: './recover-password-page.component.html',
  styleUrls: ['./recover-password-page.component.scss']
})
export class RecoverPasswordPageComponent implements OnInit {
  public recoverData:any={
    email:''
  };
  public sent:boolean = false;
  public email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private navigation:NavigationProvider, private authProvider:AuthProvider) { }

  ngOnInit() {
  }

  _doRecover(){
    this.authProvider.requestResetPassword(this.recoverData).subscribe((response)=>{
      this.sent = true;
    },error=>{
      console.log(error);
    })
  }

  _continue(){
    this.navigation._goNewPassword()
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

}
