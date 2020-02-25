import { Component, OnInit } from '@angular/core';
import { AuthProvider } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  public profile_option:any=[false,false,false,false];
  public user_data:any={};
  constructor(private authProvider:AuthProvider) { }

  ngOnInit() {
    this._getUserInformation();
  }

  _openProfileSection(section){
    this.profile_option = [0,0,0,0];
    this.profile_option[section]=1;
  }

  _getUserInformation(){
    this.authProvider.getUserInfo().subscribe((response)=>{
      this.user_data = response;
    },error=>{  
      console.log(error)
    })
  }

}
