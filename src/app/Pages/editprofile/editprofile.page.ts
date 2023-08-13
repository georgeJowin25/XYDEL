import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource, } from '@capacitor/camera';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  userDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    profileImage: '',
  };

  genderData = [
    { value: 'Male' },
    { value: 'Female' },
    { value: 'Rather not to say' },
  ];

  image: string | undefined;

  constructor(private router: Router, private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    this.loadUserDetails();
  }

  async loadUserDetails() {
    try {
      const storedUserDetails = await this.storage.get('user_details');
      if (storedUserDetails) {
        this.userDetails = JSON.parse(storedUserDetails);
        this.image = this.userDetails.profileImage;
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
      width: 300,
      height: 300,
    });
  
    if (!image || !image.webPath) {
      return;
    }
  
    this.userDetails.profileImage = image.webPath;
    this.image = image.webPath;
    await this.saveUserDetails();
  }
  async logData() {
    await this.saveUserDetails();
    this.router.navigate(['/profile'], {
      queryParams: { userDetails: JSON.stringify(this.userDetails) },
    });
  }
}
