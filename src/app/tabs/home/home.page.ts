import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Position } from '@capacitor/geolocation';
import { Geolocation } from '@capacitor/geolocation';
import { PushNotifications } from '@capacitor/push-notifications';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  address: string = '';
  pinCode: string = '';
  showCouponPopup: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.subscription.add(
      this.route.queryParams.subscribe((params) => {
        this.address = params['address'];
      })
    );

    this.requestNotificationPermissions();
  }
  async requestNotificationPermissions() {
    try {
      const result = await PushNotifications.requestPermissions();
      if (result.receive === 'granted') {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
    }
  }

  private async reverseGeocode(latitude: number, longitude: number) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      return data.address;
    } catch (error) {
      console.log('Error reverse geocoding:', error);
      return null;
    }
  }

  navigateToUserProfile() {
    this.router.navigate(['userprofile']);
  }

  navigateToOrder() {
    this.router.navigate(['order']);
  }

  handleLocationIconClick() {
    // Implement the location icon click logic here
  }
}
