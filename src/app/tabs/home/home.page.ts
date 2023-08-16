import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Position } from '@capacitor/geolocation';
import { Geolocation } from '@capacitor/geolocation';
import { PushNotifications } from '@capacitor/push-notifications';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { register } from 'swiper/element/bundle';
register();

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
  carouselItems = [
    {
      id: "01",
      image: "../assets/Images/slide1.png",
      title: "Fast and Reliable Delivery",
      description: "Get your orders delivered in record time with our reliable delivery service.",
    },
    {
      id: "02",
      image: "../assets/Images/slide2.png",
      title: "Track Your Deliveries",
      description: "Easily track your deliveries in real-time and know when to expect them.",
    },
  ];
  couponsData = [
    {
      id: 1,
      text: 'Up to 75% off on First Order',
      code: 'GETXYDEL',
      iconName: 'gift-outline',
    },
    {
      id: 2,
      text: 'Special Offer: Free Delivery',
      code: 'FREESHIP',
      iconName: 'car-outline',
    },
    {
      id: 3,
      text: '50% off on your Purchase',
      code: 'HALFOFF',
      iconName: 'flash-outline',
    },
  ];
  async requestNotificationPermissions() {
    try {
      let permStatus = await PushNotifications.checkPermissions();
      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }
    
      if (permStatus.receive === 'granted') {
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
    this.router.navigate(['/profile']);
  }

  navigateToOrder() {
    this.router.navigate(['/tabs/order']);
  }

}
