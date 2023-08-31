import { Component, OnInit } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-manual-location',
  templateUrl: './manual-location.page.html',
  styleUrls: ['./manual-location.page.scss'],
})
export class ManualLocationPage implements OnInit {

  location: string = '';
  currentLocation: Position | null = null;
  address: string = '';

  constructor(private router: Router, private storage: Storage) {}

  ngOnInit() {
    this.initStorage(); 
  }

  async initStorage() {
    await this.storage.create();
  }

  handleLocationChange(text: string) {
    this.location = text;
  }

  async handleGetCurrentLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.currentLocation = position;
      const addressResponse = await this.reverseGeocode(
        position.coords.latitude,
        position.coords.longitude
      );
      if (addressResponse) {
        const { suburb, city, state, country, postcode } = addressResponse;
        this.address = ` ${suburb},${city},${state},${country},${postcode}`;
        await this.storage.set('address', this.address);
      } else {
        this.address = 'Address not found';
      }
  }
    catch (error) {
      console.log('Error getting current location:', error);
    }
  }

  private async reverseGeocode(latitude: number, longitude: number) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();

      if (data && data.address) {
        return data.address;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Error reverse geocoding:', error);
      return null;
    }
  }

 handleNext() {

     this.router.navigate(['/tabs/home']);
  }
}
