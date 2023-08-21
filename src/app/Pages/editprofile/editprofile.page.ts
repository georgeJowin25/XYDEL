import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Storage } from '@ionic/storage-angular';
import { profileService } from './Api.Service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  userDetails = {
    firstName: '',
    lastName: '',
    emailId: '',
    mobileNumber: '',
    gender: '',
    userProfileDoc: '',
  };

  genderData = [
    { value: 'Male' },
    { value: 'Female' },
    { value: 'Rather not to say' },
  ];
  private subscription: Subscription = new Subscription();
  image: string | undefined;

  constructor(
    private router: Router,
    private storage: Storage,
    private profileService: profileService
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.loadUserDetails();
  }

  handleBack() {
    this.router.navigate(['/profile']);
  }

  async loadUserDetails() {
    try {
      const storedUserDetails = await this.storage.get('user_details');
      if (storedUserDetails) {
        this.userDetails = JSON.parse(storedUserDetails);
        this.image = this.userDetails.userProfileDoc;
      }
    } catch (error) {
      console.log('Error loading user details from Storage:', error);
    }
  }

  async saveUserDetails() {
    
    try {
      await this.storage.set('user_details', JSON.stringify(this.userDetails));
    } catch (error) {
      console.log('Error saving user details to Storage:', error);
    }
  }

  async selectImage() {
    const permissionRequestResult = await Camera.requestPermissions();
    if (permissionRequestResult.camera !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 100,
      allowEditing: true,
      width: 1000,
      height: 1000,
    });

    if (!image || !image.webPath) {
      return;
    }

    this.userDetails.userProfileDoc = image.webPath;
    this.image = image.webPath;
    await this.saveUserDetails();
  }
  async logData() {
    await this.saveUserDetails();
    this.subscription.add(
      this.profileService
        .sendUserDetails(
          this.userDetails.firstName,
          this.userDetails.lastName,
          this.userDetails.emailId,
          this.userDetails.mobileNumber,
          this.userDetails.userProfileDoc,
          this.userDetails.gender
        )
        .pipe(
          tap((response: any) => {
            console.log('API Response:', response); // Add this log to inspect the response
            if (response.status === 'User Added Successfully') {
              this.router.navigate(['/profile']);
            } else if (
              response.status === 'INTERNAL_SERVER_ERROR' &&
              response.message === 'User Not Found'
            ) {
              console.log('Internal Server Error:', response);
            } else {
              console.log("error",response);
            }
          })
        )
        .subscribe()
    );
    this.router.navigate(['/profile'], {
      queryParams: { userDetails: JSON.stringify(this.userDetails) },
    });
  }
}
