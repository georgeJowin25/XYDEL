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
    path: 'manual-location',
    loadChildren: () => import('./Pages/manual-location/manual-location.module').then( m => m.ManualLocationPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./Pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./Pages/editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {
    path: 'pick-up-location',
    loadChildren: () => import('./Pages/pick-up-location/pick-up-location.module').then( m => m.PickUpLocationPageModule)
  },
  {
    path: 'drop-location',
    loadChildren: () => import('./drop-location/drop-location.module').then( m => m.DropLocationPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
