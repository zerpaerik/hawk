import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LandingPageComponent } from '../auth/landing/landing-page.component';
import { ComparisonListComponent } from './comparisons/comparisons-list/comparison-list.component';
import { NewComparisonComponent } from './comparisons/new-comparison/new-comparison.component';
import { ComparisonResultsComponent } from './results/comparison-results/comparison-results.component';
import { OptimizationPdfComponent } from './results/pdfs/optimization-pdf/optimization-pdf.component';
const appRoutes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  { path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  // \\\{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
  ],
  declarations: [OptimizationPdfComponent]
})
export class SystemModule { }