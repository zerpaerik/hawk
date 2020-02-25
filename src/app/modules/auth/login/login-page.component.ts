import { Component, OnInit } from '@angular/core';
import { AuthProvider } from 'src/app/providers/auth.service';
import { Router } from '@angular/router';
import { NavigationProvider } from 'src/app/providers/navigation.provider';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public loginData: any = {}
  public hide: boolean = true;
  public log_error: string = '';
  constructor(private authService: AuthProvider, private router: Router, private navigation: NavigationProvider) { }

  ngOnInit() {
    this.loginData = {
      email: '',
      password: ''
    }
  }

  _doLogin() {
    this.authService.userLogin(this.loginData).subscribe((response) => {
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('confirmed_user', response.email_was_confirm);
      this.navigation._goHome();
    }, error => {
      if (error.status == 400) {
        this.log_error = error.error.non_field_errors[0];
      }
    })
  }

  _goRegister() {
    this.navigation._goRegister();
  }

  _recoverPassword() {
    this.navigation._goRecoverPassword();
  }

}
