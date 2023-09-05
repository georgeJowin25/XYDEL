import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { profileService } from '../../Services/profile.Service';
import { tap, catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  firstName!: '';
  lastName!: '';
  emailId!: '';
  userProfileDoc!: '';

  constructor(
   private router: Router,
    private profileService: profileService,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.initStorage();
    this.loadUserDetails();
  }
  initStorage() {
    this.storage.create();
  }
  handleBack() {
    this.router.navigate(['/tabs/home']);
  }
  async loadUserDetails() {
    try {
      const id = await this.storage.get('id');
      if (id !== null) {
        this.profileService
          .getUserDetails(id)
          .pipe(
            tap((response) => {
              this.firstName = response.data.appUserDetails.firstName;
              this.lastName = response.data.appUserDetails.lastName;
              this.emailId = response.data.appUserDetails.emailId;
              this.userProfileDoc = response.data.appUserDetails.userProfileDoc;
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
  navigateToEditProfile() {
    this.router.navigate(['/editprofile']);
  }

  navigateToSettings() {
    // Implement navigation to the Settings page
  }

  navigateToInformation() {
    // Implement navigation to the Information page
  }

  async handleLogout() {
    await this.storage.set('id', null);
    this.router.navigate(['/getting-started']);
  }
}
