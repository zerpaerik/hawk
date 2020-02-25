import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthProvider } from 'src/app/providers/auth.service';
import { NavigationProvider } from 'src/app/providers/navigation.provider';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  public hide_confirm: boolean = true;
  public hide: boolean = true;
  public password = new FormControl('', [Validators.required]);
  public confirm_password = new FormControl('', [Validators.required]);
  public confirmed: boolean = false;
  public newData: any = {
    password: '',
    confirm_password: ''
  }
  constructor(private routeActivated: ActivatedRoute, private authProvider: AuthProvider, private navigator: NavigationProvider) { }

  ngOnInit() {
    this.newData.token = this.routeActivated.snapshot.paramMap.get('id');
  }

  _confimrNewPassword() {
    this.authProvider.resetUserPassword(this.newData).subscribe((response) => {
      this.confirmed = true;
    }, error => {
      console.log(error);
    })
  }

  _continue() {
    this.navigator._goLogin();
  }

  getMissMatchPasswordErrorMessage() {
    return "Confirm password doesn't match"
  }

}
