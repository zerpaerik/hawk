import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormsModule} from '@angular/forms';
import { AuthProvider } from 'src/app/providers/auth.service';
import { NavigationProvider } from 'src/app/providers/navigation.provider';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  public hide:boolean = true;
  public hide_confirm:boolean = true;
  public registerData:any = {};
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required]);
  public confirm_password = new FormControl('', [Validators.required]);
  public showTC: boolean = false;
  public register_errors:Array<any> = [];
  constructor(private navigation:NavigationProvider, private authProvider:AuthProvider) { }

  ngOnInit() {
    this.registerData = {
      email:'',
      username:'',
      password:'',
      confirm_password:''
    }
  }

  _tryRegister(){
    this.showTC = true;
  }
  
  _continue(){
    this.authProvider.registerUser(this.registerData).subscribe((response)=>{
      this.registerData.token = response.token;
      this.navigation._goRegisterConfirmation(this.registerData.email);
    },error=>{
      this.showTC = false;
      this.register_errors = [];
      var obj = error.error;
      this.handleRegistErrors(obj);
    })
  }

  handleRegistErrors(obj){
    for (let key in obj){
      if(obj.hasOwnProperty(key)){
        this.register_errors.push(obj[key]);
        console.log(this.register_errors);
      }
    }
  }

  _goLoginPage(){
    this.navigation._goLogin();
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  getMissMatchPasswordErrorMessage(){
    return "Confirm password doesn't match"
  }

  getPasswordErrorMessage(){
    return "Password must have at least 8 characters"
  }

}
