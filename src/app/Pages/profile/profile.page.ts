import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { profileService } from './Api.Service';
import { tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userDetails = {
    firstName: '',
    lastName: '',
    mobileNumber: '',
    alternatemobileNumber: '',
    emailId: '',
    gender: '',
    userProfileDoc: '',
  };

  constructor(
    private navCtrl: NavController,
    private profileService: profileService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.initStorage();
    this.loadUserDetails();
  }
  async initStorage() {
    await this.storage.create(); // Initialize Ionic Storage
  }
  handleBack() {
    this.navCtrl.navigateBack(['/tabs/home']);
  }
  async loadUserDetails() {
    try {
      const id = await this.storage.get('id');
      if (id !== null) {
        this.profileService
          .getUserDetails(id)
          .pipe(
            tap({
              next: (response) => {
                const user = response.data[0]; // Assuming data is an array with a single user object
                this.userDetails = {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  mobileNumber: user.mobileNumber,
                  alternatemobileNumber: user.alternateMobileNumber,
                  emailId: user.emailId,
                  gender: user.gender,
                  userProfileDoc: user.userProfileDoc,
                };
              },
              error: (error) => {
                console.error('Error loading user details:', error);
              },
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
    this.navCtrl.navigateForward(['/editprofile']);
  }

  navigateToSettings() {
    // Implement navigation to the Settings page
  }

  navigateToInformation() {
    // Implement navigation to the Information page
  }

  async handleLogout() {
    await this.storage.clear();
    this.navCtrl.navigateRoot(['getting-started']);
  }
}
