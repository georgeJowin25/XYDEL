import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DropLocationPage } from './drop-location.page';

const routes: Routes = [
  {
    path: '',
    component: DropLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DropLocationPageRoutingModule {}
