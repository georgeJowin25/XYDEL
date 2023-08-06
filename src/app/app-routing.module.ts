import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'getting-started',
    loadChildren: () => import('./Pages/getting-started/getting-started.module').then( m => m.GettingStartedPageModule)
  },
  {
    path: '',
    redirectTo: 'getting-started',
    pathMatch: 'full'
  },
  {
    path: 'mobile-number',
    loadChildren: () => import('./Pages/mobile-number/mobile-number.module').then( m => m.MobileNumberPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./Pages/otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'location',
    loadChildren: () => import('./Pages/location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'manual-location',
    loadChildren: () => import('./Pages/manual-location/manual-location.module').then( m => m.ManualLocationPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
