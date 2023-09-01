import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PushNotifications } from '@capacitor/push-notifications';
import { Storage } from '@ionic/storage-angular';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
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
      iconName: 'gift',
    },
    {
      id: 2,
      text: 'Special Offer: Free Delivery',
      code: 'FREESHIP',
      iconName: 'car',
    },
    {
      id: 3,
      text: '50% off on your Purchase',
      code: 'HALFOFF',
      iconName: 'flash',
    },
  ];
  address: string = '';

  constructor(private router: Router, private storage: Storage) {}

  ngOnInit() {
    this.initStorage();
    this.registerNotifications();
    this.retrieveAndSetHomeAddress();
  }

  async initStorage() {
    await this.storage.create();
  }

  async registerNotifications() {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }
  }

  async retrieveAndSetHomeAddress() {
    this.address = (await this.storage.get('address')) || '';
  }

  navigateToUserProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToOrder() {
    this.router.navigate(['/tabs/order']);
  }
}
