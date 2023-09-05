import { profileService } from '../../Services/profile.Service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { catchError, EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  userForm!: FormGroup;
  private appUserDetails: any;

  genderData = [
    { value: 'Male' },
    { value: 'Female' },
    { value: 'Rather not to say' },
  ];

  constructor(
    private router: Router,
    private profileService: profileService,
    private storage: Storage,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initStorage();
    this.loadUserDetails();
    this.initForm();
  }

  async initStorage() {
    await this.storage.create();
  }
  initForm() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      alternateMobileNumber: ['', [Validators.pattern('^[0-9]{10}$')]],
      emailId: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      userProfileDoc: [''],
    });
  }

  handleBack() {
    this.router.navigate(['/profile']);
  }
  async loadUserDetails() {
    try {
      const id = await this.storage.get('id');
      if (id !== null) {
        this.profileService
          .getUserDetails(id)
          .pipe(
            tap((response) => {
              const user = response.data.appUserDetails;
              const mobile = response.data.appUser;
              this.userForm.patchValue(user);
              this.userForm.patchValue(mobile);
              this.appUserDetails = response.data.appUserDetails;
            }),
            catchError((error) => {
              console.error('Error loading user details:', error);
              return EMPTY;
            })
          )
          .subscribe();
      } else {
        console.error('No id found in storage');
      }
    } catch (error) {
      console.error('Error retrieving id from storage:', error);
    }
  }

  async selectImage() {
    const permissionRequestResult = await Camera.requestPermissions();

    if (permissionRequestResult.camera !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });
      
      this.userForm.patchValue({ userProfileDoc: image.base64String });
    } catch (error) {
      console.error('Error getting photo from camera:', error);
    }
  }

  async logData() {
    const formValue = await this.userForm.value;
    const id = await this.storage.get('id');
    if (this.appUserDetails == null) {
      this.profileService
        .sendUserDetails(formValue, id)
        .pipe(
          tap((response: any) => {
            if (response.message === 'User Added Successfully') {
              this.router.navigate(['/tabs/home']);
            } else if (
              response.status === 'INTERNAL_SERVER_ERROR' &&
              response.message === 'User Not Found'
            ) {
              console.log('Internal Server Error:', response);
            } else {
              console.log('error', response);
            }
          })
        )
        .subscribe();
    } else {
      this.profileService
        .updateUserDetails(formValue, id)
        .pipe(
          tap((response: any) => {
            if (response.message === 'User Updated Successfully') {
              this.router.navigate(['/tabs/home']);
            }
          })
        )
      .subscribe();
    }
  }
}
