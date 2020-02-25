import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationProvider } from 'src/app/providers/navigation.provider';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private navigation:NavigationProvider) { }

  ngOnInit() {
  }

  _goLogin(){
    this.navigation._goLogin();
  }

  _goRegister(){
    this.navigation._goRegister();
  }

  _goLoginSonicu(){
    this.navigation._goLoginSonicu();
  }

}
