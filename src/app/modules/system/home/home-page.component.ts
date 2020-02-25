import { Component, OnInit, HostListener } from '@angular/core';
import { AuthProvider } from 'src/app/providers/auth.service';
import { NavigationProvider } from 'src/app/providers/navigation.provider';
import { ResponsiveProvider } from 'src/app/providers/responsive-provider';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public list:Array<any> = ['','','','','','']
  public breakpoint: number;
  public row_height:string;
  constructor(private authProvider:AuthProvider, private navigator:NavigationProvider, private responsiveProvider:ResponsiveProvider) { }

  ngOnInit() {
    this.breakpoint = this.responsiveProvider.getNumCols(window.innerWidth);
    this.row_height = this.responsiveProvider.getRowHeight(window.innerWidth);
    console.log(this.row_height);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.breakpoint = this.responsiveProvider.getNumCols(window.innerWidth);
    this.row_height = this.responsiveProvider.getRowHeight(window.innerWidth);
  }

  _logOut(){
    this.authProvider.userLogut().subscribe((response)=>{
      console.log(response)
    },error=>{
      console.log(error);
    })
  }

  _homeCases(){
    this.navigator._goHomeCases(null);
  }

  _filterList(){
    this.navigator._goFilterList();
  }

}
