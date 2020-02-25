import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthProvider } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-confirm-register-page',
  templateUrl: './confirm-register-page.component.html',
  styleUrls: ['./confirm-register-page.component.scss']
})
export class ConfirmRegisterPageComponent implements AfterViewInit {

  public user_email: any = '';
  public confirming: boolean = false;
  public previous_page: string;
  constructor(private routeActivated: ActivatedRoute, private authProvider: AuthProvider) { }


  ngOnInit() {
    this.routeActivated.queryParams.subscribe(async params => {
      this.user_email = params.email;
      this.previous_page = localStorage.getItem('previousUrl');
    });
  }

  ngAfterViewInit(): void { }

  _sendEmail() {
    this.authProvider.registerUserConfirmation('').subscribe((response) => {
    }, error => {
      console.log(error);
    })
  }

  _confirmCode() {
    this.confirming = true;
  }

}
