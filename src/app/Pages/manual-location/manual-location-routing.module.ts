import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManualLocationPage } from './manual-location.page';

const routes: Routes = [
  {
    path: '',
    component: ManualLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManualLocationPageRoutingModule {}
