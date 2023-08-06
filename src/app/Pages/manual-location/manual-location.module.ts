import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManualLocationPageRoutingModule } from './manual-location-routing.module';

import { ManualLocationPage } from './manual-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManualLocationPageRoutingModule
  ],
  declarations: [ManualLocationPage]
})
export class ManualLocationPageModule {}
