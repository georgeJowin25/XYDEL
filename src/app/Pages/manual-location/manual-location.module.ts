import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { IonicModule } from '@ionic/angular';

import { ManualLocationPageRoutingModule } from './manual-location-routing.module';

import { ManualLocationPage } from './manual-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManualLocationPageRoutingModule,
    IonicStorageModule.forRoot(),
  ],
  declarations: [ManualLocationPage]
})
export class ManualLocationPageModule {}
