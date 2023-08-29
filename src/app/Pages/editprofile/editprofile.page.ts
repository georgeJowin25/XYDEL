import { profileService } from '../../Services/profile.Service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Subscription,catchError,EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  userForm!: FormGroup;

  genderData = [
    { value: 'Male' },
    { value: 'Female' },
    { value: 'Rather not to say' },
  ];

  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private profileService: profileService,
    private storage: Storage,
    private fb: FormBuilder
  ) { }

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
        this.profileService.getUserDetails(id).pipe(
          tap((response) => {
            const mobile = response.data.appUser;
            const user = response.data.appUserDetails;
            this.userForm.patchValue(user);
            this.userForm.patchValue(mobile);
          }),
          catchError((error) => {
            console.error('Error loading user details:', error);
            return EMPTY; 
          })
        ).subscribe();
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

    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 100,
      allowEditing: true,
      width: 1000,
      height: 1000,
    });

    if (image && image.webPath) {
      const imageBase64 = await this.convertImageToBase64(image.webPath);
      this.userForm.patchValue({ userProfileDoc: imageBase64 });
    }
  }

  async convertImageToBase64(imagePath: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(img, 0, 0);
          const base64String = canvas.toDataURL('image/jpeg');
          resolve(base64String);
        } else {
          reject(new Error('Canvas context is null'));
        }
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.crossOrigin = 'anonymous';
      img.src = imagePath;
    });
  }

  async logData() {
    if (this.userForm.valid) {
      const formValue = await this.userForm.value;
      const id = await this.storage.get('id');
      this.subscription.add(
        this.profileService
          .sendUserDetails(formValue,id)
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
          .subscribe()
      );
    }
  }
}
