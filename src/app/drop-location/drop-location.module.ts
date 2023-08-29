import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DropLocationPageRoutingModule } from './drop-location-routing.module';

import { DropLocationPage } from './drop-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DropLocationPageRoutingModule
  ],
  declarations: [DropLocationPage]
})
export class DropLocationPageModule {}
