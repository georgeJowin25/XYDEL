import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MobileNumberPageRoutingModule } from './mobile-number-routing.module';
import { MobileNumberPage } from './mobile-number.page';
import { HttpClientModule } from '@angular/common/http';
import { mobileService } from '../../Services/mobile.Service';




@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    IonicModule,
    MobileNumberPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
   
  ],
  declarations: [MobileNumberPage],
  providers: [mobileService],
})
export class MobileNumberPageModule {}
