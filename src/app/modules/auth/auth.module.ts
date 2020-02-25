import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LandingPageComponent } from './landing/landing-page.component';

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
  declarations: []
})
export class AuthModule { }
