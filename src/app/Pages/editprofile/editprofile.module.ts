import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { profileService } from './Api.Service';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { EditprofilePageRoutingModule } from './editprofile-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EditprofilePage } from './editprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditprofilePageRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
  ],
  declarations: [EditprofilePage],
  providers: [profileService],
})
export class EditprofilePageModule {}
