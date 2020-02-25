import { Injectable, HostListener } from '@angular/core';

@Injectable()
export class ResponsiveProvider {
    constructor() {
        this.getNumCols(window.innerWidth);
    }

    public getNumCols(width){
        let num_cols:number;
        if(width > 590 && width < 910) {
            num_cols = 2
          }
          if(width < 590){
            num_cols  = 1
          }
          if(width < 1260 && width > 910){
            num_cols  = 3
          }
          if(width > 1260){
            num_cols  = 4
          }
        return num_cols
    }

    public getRowHeight(width){
      let height:string;
        if(width < 460){
          height  = '400px'
        }
        if(width > 460 && width < 512) {
          height = '280px'
        }
        if(width > 512 && width < 640) {
          height = '320px'
        }
        if(width > 640 && width < 860) {
          height = '360px'
        }
        if(width < 960 && width > 860){
          height  = '320px'
        }
        if(width < 1024 && width > 960){
          height  = '350px'
        }
        if(width < 1200 && width > 1024){
          height  = '320px'
        }
        if(width < 1340 && width > 1200){
          height  = '340px'
        }
        if(width > 1340){
          height  = '380px'
        }
      return height
  }

}
