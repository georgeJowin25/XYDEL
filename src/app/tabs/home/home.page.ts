import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Position } from '@capacitor/geolocation'; // Import Position instead of GeolocationPosition
import { Geolocation } from '@capacitor/geolocation';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { Subscription, interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  carouselItems = [
    {
      id: '01',
      image: '../assets/Images/slide1.png',
      title: 'Fast and Reliable Delivery',
      description:
        'Get your orders delivered in record time with our reliable delivery service.',
    },
    {
      id: '02',
      image: '../assets/Images/slide2.png',
      title: 'Track Your Deliveries',
      description:
        'Easily track your deliveries in real-time and know when to expect them.',
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
  address: string = '';
  private subscription: Subscription = new Subscription();
  private routerSubscription: Subscription = new Subscription();
  private locationUpdateSubscription: Subscription = new Subscription();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscription.add(
      this.route.queryParams.subscribe((params) => {
        this.address = params['address'];
      })
    );
    
    this.registerNotifications();
    // Update location on initial load
    this.updateLocation();

    // Subscribe to router events to trigger location updates when switching tabs
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateLocation();
      });

    // Start updating location every 5 seconds
    this.locationUpdateSubscription = interval(5000).subscribe(() => {
      this.updateLocation();
    });
  }

  ngOnDestroy() {
    // Unsubscribe from subscriptions to prevent memory leaks
    this.subscription.unsubscribe();
    this.routerSubscription.unsubscribe();
    this.locationUpdateSubscription.unsubscribe();
  }

  async updateLocation() {
    try {
      const position: Position = await Geolocation.getCurrentPosition(); // Use Position type
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // Update the location or perform any other actions
      console.log('New location:', latitude, longitude);
      const address = await this.reverseGeocode(latitude, longitude);
      if (address) {
        const { suburb, city, state, country, postcode } = address;
        this.address = ` ${suburb}, ${city}, ${state}, ${country}, ${postcode}`;
      }
    } catch (error) {
      console.error('Error updating location:', error);
    }
  }   

  async registerNotifications () {
    let permStatus = await PushNotifications.checkPermissions();
  
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
  
    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
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
