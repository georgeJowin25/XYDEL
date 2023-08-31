import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-drop-location',
  templateUrl: './drop-location.page.html',
  styleUrls: ['./drop-location.page.scss'],
})
export class DropLocationPage  {
  location: string = '';
  currentLocation: Position | null = null;
  address: string = '';

  constructor(private router: Router) {}
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
      } else {
        this.address = 'Address not found';
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
    this.router.navigate(['/tabs/order']);
  }
}
