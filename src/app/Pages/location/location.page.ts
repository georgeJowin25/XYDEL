import { Component, OnInit } from '@angular/core';
import { Position } from '@capacitor/geolocation';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  constructor(private router: Router, private storage: Storage) {}

  ngOnInit() {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }
  
  async handleAllowLocation() {
    try {
      let permissionStatus = await Geolocation.checkPermissions();
      if (permissionStatus.location === 'prompt') {
        permissionStatus = await Geolocation.requestPermissions();
      }
      if (permissionStatus.location === 'granted') {
        const position: Position = await Geolocation.getCurrentPosition();
        const { latitude, longitude } = position.coords;
        const addressResponse = await this.reverseGeocode(latitude, longitude);
        if (addressResponse) {
          const { suburb, city, state, country, postcode } = addressResponse;
          const formattedAddress = `${suburb}, ${city}, ${state}, ${country}, ${postcode}`;
          await this.storage.set('address', formattedAddress);
          this.router.navigate(['/tabs/home']);
        } else {
          alert('Address not found');
        }
      } else {
        this.router.navigate(['/manual-location']);
      }
    } catch (error) {
      console.log('Error getting current location:', error);
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

  navigateToManualLocation() {
    this.router.navigate(['/manual-location']);
  }
}
