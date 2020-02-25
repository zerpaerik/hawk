import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/log.guard';
import { AuthsGuard } from './guards/logs.guard';
import { LandingPageComponent } from './modules/auth/landing/landing-page.component';
import { LoginPageComponent } from './modules/auth/login/login-page.component';
import { LoginPageSonicuComponent } from './modules/auth/login-sonicu/login-sonicu-page.component';
import { RegisterPageComponent } from './modules/auth/register/register-page.component';
import { ConfirmRegisterPageComponent } from './modules/auth/regist-confirmation/confirm-register-page.component';
import { RecoverPasswordPageComponent } from './modules/auth/recover-password/recover-password-page.component';
import { NewPasswordComponent } from './modules/auth/recover-password/new-password/new-password.component';
import { TermsAndConditionsComponent } from './modules/auth/register/terms/terms-and-conditions.component';
import { HomePageComponent } from './modules/system/home/home-page.component';
import { CaseListComponent } from './modules/system/cases/case-list/case-list.component';
import { FilterListComponent } from './modules/system/filters/filters-list/filter-list.component';
import { FilterDetailsComponent } from './modules/system/filters/filter-details/filter-details.component';
import { ReportFileDropperComponent } from './modules/system/reports/report-file-dropper/report-file-dropper.component';
import { NewCaseComponent } from './modules/system/cases/new-case/new-case.component';
import { OptimizationResultsComponent } from './modules/system/results/optimization-results/optimization-results.component';
import { ProfilePageComponent } from './modules/system/profile/profile-page.component';
import { ComparisonListComponent } from './modules/system/comparisons/comparisons-list/comparison-list.component';
import { ComparisonResultsComponent } from './modules/system/results/comparison-results/comparison-results.component';
import { OptimizationPdfComponent } from './modules/system/results/pdfs/optimization-pdf/optimization-pdf.component';
import { InstrumentComponent } from './modules/system/instrument/instrument-list.component';

const routes: Routes = [
  {
    path: 'landing',
    component:LandingPageComponent,
    //component:LandingPageComponent,canActivate:[AuthGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'loginsonicu',
    component: LoginPageSonicuComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,canActivate:[AuthGuard]
  },
  {
    path: 'confirm-register',
    component: ConfirmRegisterPageComponent,canActivate:[AuthGuard]
  },
  {
    path: 'confirm-register/:id',
    component: HomePageComponent,canActivate:[AuthGuard]
  },
  {
    path: 'recover-password',
    component: RecoverPasswordPageComponent, canActivate: [AuthGuard]

  },
  {
    path: 'new-password',
    component: NewPasswordComponent, canActivate: [AuthGuard]
  },
  {
    path: 'recover-password/:id',
    component: NewPasswordComponent, canActivate: [AuthGuard]
  },
  {
    path: 't&c',
    component: TermsAndConditionsComponent, canActivate: [AuthGuard]

  },
  {
    path: 'optimization-results',
    component: OptimizationResultsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'comparison-results',
    component: ComparisonResultsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'case-list',
    component: CaseListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'upload-report',
    component: ReportFileDropperComponent, canActivate: [AuthGuard]
  },
  {
    path: 'new-case',
    component: NewCaseComponent, canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomePageComponent, canActivate: [AuthGuard]
  },
  {
    path: 'filter-list',
    component: FilterListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'filter-details',
    component: FilterDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfilePageComponent, canActivate: [AuthGuard]
  },
  {
    path: 'comparisons-list',
    component: ComparisonListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'optimization-pdf',
    component: OptimizationPdfComponent, canActivate: [AuthGuard]
  },
  {
    path: 'instrument-list',
    component: InstrumentComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
