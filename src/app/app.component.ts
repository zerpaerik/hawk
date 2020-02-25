import { Component } from '@angular/core';
import { Router,Event, ActivatedRoute, ActivatedRouteSnapshot, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { AuthProvider } from './providers/auth.service';
import { AuthSonicuProvider } from './providers/authsonicu.service';
import { NavigationProvider } from './providers/navigation.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'howk';
  routes:any=[];
  outer_header:boolean = true;
  link_active:any = 'landing';
  constructor(private router:Router,private authProvide:AuthProvider, private navigator:NavigationProvider){

    this.routes = this.router.config;

    this.router.events.subscribe( async (event: Event) => {
      //var token = localStorage.getItem('auth_token');
      // if (event instanceof NavigationStart) {
        //   if (!token && event.url != '/' && event.url != '/auth'){
          //     event.url = event.url.replace('/','');
          //     window.localStorage.setItem('attemptLoginUrl', event.url);
        //   }

        //   if(event.url == '/landing' || event.url == '/pdf-report' || event.url == '/' ){
          //     this.show_footer = false;
        //   }else{
          //     this.show_footer = true;
          //   }
        // }

        if (event instanceof NavigationEnd) {
          var token = localStorage.getItem('auth_token');
          var tokens = localStorage.getItem('auths_token');
          if((event.url.split('/')[1] == 'confirm-register') && (event.url.split('/')[2])){
            var confirm_email_token = event.url.split('/')[2]
            this._confirmUserEmail(confirm_email_token);
          }else if((event.url.split('/')[1] == 'recover-password') && (event.url.split('/')[2])){
            console.log('new pass');
          }else{
            if(!token && event.url != '/' && event.url != '/login' && event.url != '/register'
            && event.url != '/recover-password' && event.url != '/new-password' && (event.url.split('?')[0] != '/confirm-register')){
              this.router.navigate(["/landing"],{replaceUrl:true});
            }
            if(token && (event.url == "/login" || event.url == "/register" || event.url == "/recover-password" || event.url == "/new-password")){
              this.router.navigate(["/home"],{replaceUrl:true});
            }
            // Hide loading indicator
            event.url = event.url.replace('/','');
            this.link_active =  event.url;
            if((event.url == 'register') || (event.url == 'login') || (event.url == 'recover-password') || (event.url == '')
            || (event.url == 'new-password') || (event.url == 'landing') || (event.url.split('?')[0] == 'confirm-register')){
              this.outer_header = true;
            }else{
              this.outer_header = false;
            }
            var route = this.routes.find((route => route.path == event.url));
            if(route && route.path != '404'){
              window.localStorage.setItem('previousUrl', this.router.url);
              //this.router.navigate(['404'],{ skipLocationChange: true })
            }
            if(!token && event.url == ""){
              this.router.navigate(["/landing"],{replaceUrl:true});
            }else if(token && event.url == ""){
              this.router.navigate(['/home'],{replaceUrl:true});
              this.outer_header = false
            }
            if(!tokens && event.url == "/instrument-list"){
              this.router.navigate(["/loginsonicu"],{replaceUrl:true});
            }else if(tokens && event.url == "/instrument-list"){
              this.router.navigate(['/instrument-list'],{replaceUrl:true});
              this.outer_header = false

            }

          }
        }



        if (event instanceof NavigationError) {
            // Hide loading indicator

            // Present error to user
            console.log(event.error);
        }
      })
  }

  _confirmUserEmail(confirm_token){
    console.log(confirm_token);
    this.authProvide.validateUserEmail(confirm_token).subscribe((response)=>{
      localStorage.setItem('auth_token',response.token);
      localStorage.setItem('confirmed_user', response.email_was_confirm);
      this.navigator._goHome();
      console.log(response);
    },error=>{
      console.log(error);
    })
  }
}
