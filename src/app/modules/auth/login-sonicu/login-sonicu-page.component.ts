import { Component, OnInit } from '@angular/core';
import { AuthSonicuProvider } from 'src/app/providers/authsonicu.service';
import { Router } from '@angular/router';
import { NavigationProvider } from 'src/app/providers/navigation.provider';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-sonicu-page.component.html',
  styleUrls: ['./login-sonicu-page.component.scss']
})
export class LoginPageSonicuComponent implements OnInit {
  public loginDataSonicu: any = {}
  public hide: boolean = true;
  public log_error: string = '';
  constructor(private authService: AuthSonicuProvider, private router: Router, private navigation: NavigationProvider) { }

  ngOnInit() {
    this.loginDataSonicu = {
      username: '',
      password: '',
      client_id: '',
      client_secret: ''
    }
  }

  _doLoginSonicu() {
    this.authService.userLoginSonicu(this.loginDataSonicu).subscribe((response) => {
      this.navigation._goInstrumentList();
    }, error => {
      if (error.status == 401) {
        this.log_error = error.error.detail;
      }
    })
  }

  _getTokenSonicu() {
    return localStorage.getItem('auth_token');
  }



}
