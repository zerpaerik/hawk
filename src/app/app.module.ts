//ANGULAR DEFAULT MODULES
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

//MATERIAL DESIGN MODULES
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatNativeDateModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import {MatSort} from '@angular/material/sort';


import { NgImageSliderModule } from 'ng-image-slider';

//ROUTER
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

//GUARDS
import { AuthGuard } from './guards/log.guard';
import { AuthsGuard } from './guards/logs.guard';


//PROVIDERS
import { AuthProvider } from './providers/auth.service';
import { AuthSonicuProvider } from './providers/authsonicu.service';
import { InstrumentProvider } from './providers/instrument.service';
import { NavigationProvider } from './providers/navigation.provider';
import { NewPasswordComponent } from './modules/auth/recover-password/new-password/new-password.component';
import { TermsAndConditionsComponent } from './modules/auth/register/terms/terms-and-conditions.component';
import { HomePageComponent } from './modules/system/home/home-page.component';
import { CaseProvider } from './providers/case.service';

//PAGES COMPONENTS
import { AppComponent } from './app.component';
import { ConfirmRegisterPageComponent } from './modules/auth/regist-confirmation/confirm-register-page.component';
import { LandingPageComponent } from './modules/auth/landing/landing-page.component';
import { LoginPageComponent } from './modules/auth/login/login-page.component';
import { LoginPageSonicuComponent } from './modules/auth/login-sonicu/login-sonicu-page.component';
import { RegisterPageComponent } from './modules/auth/register/register-page.component';
import { RecoverPasswordPageComponent } from './modules/auth/recover-password/recover-password-page.component';
import { CaseListComponent } from './modules/system/cases/case-list/case-list.component';
import { FilterListComponent } from './modules/system/filters/filters-list/filter-list.component';
import { FilterProvider } from './providers/filter.service';
import { FilterDetailsComponent } from './modules/system/filters/filter-details/filter-details.component';
import { FilterTestReportsComponent } from './modules/system/reports/filter-test-reports/filter-test-reports.component';
import { ReportsProvider } from './providers/reports.service';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderLoggedComponent } from './components/headers/header-logged/header-logged.component';
import { HeaderGeneralComponent } from './components/headers/header-general/header-general.component';
import { NewCaseComponent } from './modules/system/cases/new-case/new-case.component';
import { ReportFileDropperComponent } from './modules/system/reports/report-file-dropper/report-file-dropper.component';
import { InstrumentComponent } from './modules/system/instrument/instrument-list.component';


import { DragDirective } from './directives/dragDrop.directive';
import { GaugeComponentComponent } from './components/gauge/gauge-component.component';

import { GaugesModule } from '@progress/kendo-angular-gauges';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { OptimizationResultsComponent } from './modules/system/results/optimization-results/optimization-results.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { ChartDpVsTimeComponent } from './components/charts/chart-dp-vs-time/chart-dp-vs-time.component';
import { ChartCostVsTimeComponent } from './components/charts/chart-cost-vs-time/chart-cost-vs-time.component';
import { ProfilePageComponent } from './modules/system/profile/profile-page.component';
import { CreditCarDListPageComponent, DialogDeleteConfirmation } from './modules/system/profile/credit-cards/credit-cards-list/credit-cart-list-page.component';
import { PaymentProvider } from './providers/payment.service';
import { PlansListComponent } from './modules/system/profile/plans/plans-list.component';
import { SubscriptionsListComponent } from './modules/system/profile/subscriptions/subscriptions-list.component';
import { PaymentDialogComponent } from './components/modal-dialogs/payment-dialog/payment-dialog.component';
import { ConfirmDialogComponent } from './components/modal-dialogs/confirm-dialog/confirm-dialog.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { ComparisonListComponent } from './modules/system/comparisons/comparisons-list/comparison-list.component';
import { NewComparisonComponent } from './modules/system/comparisons/new-comparison/new-comparison.component';
import { CarouselComponent } from './components/carousel/carousel.component';

import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ComparisonResultsComponent } from './modules/system/results/comparison-results/comparison-results.component';
import { ComparisonProvider } from './providers/comparison.service';
import { AdvancedSearchComponent } from './components/modal-dialogs/advanced-search-dialog/advanced-search.component';
import { MetaDataProvider } from './providers/metadata.service';
import { ErrorDialogComponent } from './components/modal-dialogs/error-dialog/error-dialog.component';
import { ReplaceCostDialogComponent } from './components/modal-dialogs/replace-cost-dialog/replace-cost-dialog.component';
import { AirFlowDialogComponent } from './components/modal-dialogs/airflow-dialog/air-flow-dialog.component';
import { ResponsiveProvider } from './providers/responsive-provider';
import { UtilsFunctions } from './providers/utils.functions';
import { HighlightDirective } from './directives/hightLightText.directive';
import { TitleCasePipe, TitleWordPipe } from './pipes/titleCase.pipe';
import { OptimizationPdfComponent } from './modules/system/results/pdfs/optimization-pdf/optimization-pdf.component';
import { GenericListComponent } from './components/list/generic-list/generic-list.component';
import { PdfViewerComponent } from './components/modal-dialogs/pdf-viewer/pdf-viewer.component';
import { NotificationService } from './providers/notifications.service';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginPageComponent,
    LoginPageSonicuComponent,
    RegisterPageComponent,
    ConfirmRegisterPageComponent,
    RecoverPasswordPageComponent ,
    NewPasswordComponent,
    TermsAndConditionsComponent,
    HomePageComponent,
    CaseListComponent,
    FilterListComponent,
    FilterDetailsComponent,
    FilterTestReportsComponent,
    FooterComponent,
    HeaderLoggedComponent,
    HeaderGeneralComponent,
    NewCaseComponent,
    ReportFileDropperComponent,
    DragDirective,
    HighlightDirective,
    TitleCasePipe,
    TitleWordPipe,
    GaugeComponentComponent,
    OptimizationResultsComponent,
    DialogDeleteConfirmation,
    PieChartComponent,
    ChartDpVsTimeComponent,
    ChartCostVsTimeComponent,
    ProfilePageComponent,
    CreditCarDListPageComponent,
    PlansListComponent,
    SubscriptionsListComponent,
    OptimizationPdfComponent,
    PaymentDialogComponent,
    ConfirmDialogComponent,
    BarChartComponent,
    ComparisonListComponent,
    NewComparisonComponent,
    CarouselComponent,
    ComparisonResultsComponent,
    AdvancedSearchComponent,
    ErrorDialogComponent,
    ReplaceCostDialogComponent,
    AirFlowDialogComponent,
    GenericListComponent,
    PdfViewerComponent,
    InstrumentComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDividerModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule,
    GaugesModule,
    DateInputsModule,
    MatListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatRadioModule,
    NgImageSliderModule,
    Ng2CarouselamosModule,
    CarouselModule,
    MatSlideToggleModule,
    NgxExtendedPdfViewerModule,

  ],
  entryComponents:[
    AirFlowDialogComponent,
    DialogDeleteConfirmation,
    PaymentDialogComponent,
    ConfirmDialogComponent,
    AdvancedSearchComponent,
    ErrorDialogComponent,
    ReplaceCostDialogComponent,
    PdfViewerComponent,
  ],
  providers: [
    AuthGuard,
    AuthsGuard,
    AuthProvider,
    AuthSonicuProvider,
    CaseProvider,
    ComparisonProvider,
    NavigationProvider,
    FilterProvider,
    ReportsProvider,
    PaymentProvider,
    MatDatepickerModule,
    MetaDataProvider,
    ResponsiveProvider,
    UtilsFunctions,
    NotificationService,
    InstrumentProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    // Use a custom replacer to display function names in the route configs
    // const replacer = (key, value) => (typeof value === 'function') ? value.name : value;

  }
}
