import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  firstName: string | null = null;
  lastName: string | null = null;
  email: string | null = null;
  image: string | null = null;

  constructor(private navCtrl: NavController, private route: ActivatedRoute, private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    this.route.queryParams.subscribe((params) => {
      if (params['userDetails']) {
        const userDetails = JSON.parse(params['userDetails']);
        this.firstName = userDetails.firstName;
        this.lastName = userDetails.lastName;
        this.email = userDetails.email;
        this.image = userDetails.profileImage;
      }
    });
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
