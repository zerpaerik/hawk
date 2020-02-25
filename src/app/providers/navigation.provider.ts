import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { SystemFilter } from '../models/system-filter.model';
import { System } from '../models/system.model';


@Injectable()
export class NavigationProvider {

    constructor(private route: Router, private router:Router) {

    }

    _land(){
        this.router.navigate(["/landing"],{replaceUrl:true});
    }

    _goLogin(){
        this.router.navigate(["/login"],{replaceUrl:true});
    }
    _goLoginSonicu(){
      this.router.navigate(["/loginsonicu"],{replaceUrl:true});
  }

    _goNewReport(){
        this.router.navigate(["/upload-report"],{replaceUrl:true});
    }

    _goRegister(){
        this.router.navigate(["/register"],{replaceUrl:true});
    }

    _goRecoverPassword(){
        this.router.navigate(["/recover-password"],{replaceUrl:true});
    }

    _goNewPassword(){
        this.router.navigate(["/new-password"],{replaceUrl:true});
    }

    _goTermsAndConditions(){
        this.router.navigate(["/t&c"],{replaceUrl:true});
    }

    _goHome(){
        this.router.navigate(["/home"],{replaceUrl:true});
    }

    _goOptimizationsResults(data){
        this.router.navigate(["/optimization-results"], {
            queryParams:{'case':JSON.stringify(data)},
            skipLocationChange:true
        });
    }

    _goComparisonResults(data){
        this.router.navigate(["/comparison-results"], {
            queryParams:{'comparison_data':JSON.stringify(data)},
            skipLocationChange:true
        });
    }

    _goHomeCases(filter){
        let navigationExtras: NavigationExtras = {
            queryParams: {
              "filter": JSON.stringify(filter)
            }
        };
        this.router.navigate(["/case-list"],navigationExtras);
    }

    _goHomeCasesClear(){
        this.router.navigate(["/case-list"],{replaceUrl:true , skipLocationChange:true});
    }

    _goHomeComparisons(){
        this.router.navigate(["/comparisons-list"],{replaceUrl:true});
    }


    _goFilterList(){
        this.router.navigate(["/filter-list"]);
    }

    _goInstrumentList(){
      this.router.navigate(["/instrument-list"]);
  }

    _goProfile(){
        this.router.navigate(['/profile']);
    }

    _goFilterDetails(filter){
        let navigationExtras: NavigationExtras = {
            queryParams: {
              "filter": filter
            }
          };
        this.router.navigate(["/filter-details"],navigationExtras);
    }

    _goPdfPreview(data:System,chart_data:any){
        this.router.navigate(["/optimization-pdf"], {
            queryParams:{
                'pdf_data':JSON.stringify(data),
                'chart_data':JSON.stringify(chart_data)
            },
            skipLocationChange:true
        });
    }

    _goRegisterConfirmation(email){
        let navigationExtras: NavigationExtras = {
            queryParams: {
              "email": email
            }
          };
        this.router.navigate(['/confirm-register'],navigationExtras);
    }



}
