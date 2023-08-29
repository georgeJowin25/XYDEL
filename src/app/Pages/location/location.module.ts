import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { IonicModule } from '@ionic/angular';
import { LocationPageRoutingModule } from './location-routing.module';
import { LocationPage } from './location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationPageRoutingModule,
    IonicStorageModule.forRoot(),
  ],
  declarations: [LocationPage]
})
export class LocationPageModule {}
