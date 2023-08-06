import { Component } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manual-location',
  templateUrl: './manual-location.page.html',
  styleUrls: ['./manual-location.page.scss'],
})
export class ManualLocationPage {
  location: string = '';
  currentLocation: Position | null = null;
  address: string = '';
  pinCode: string = '';

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
        const { postcode } = addressResponse;
        console.log(addressResponse);
        const { suburb, city, state, country } = addressResponse;
        this.address = ` ${suburb}, ${city}, ${state}, ${country}`;
        this.pinCode = postcode
        || 'Pin code not found';
      } else {
        this.address = 'Address not found';
        this.pinCode = 'Pin code not found';
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
    if (!this.currentLocation) {
      // Location is not selected, show an alert
      alert('Please select the location');
      return;
    }

    // Location is selected, navigate to the next screen
    this.router.navigate(['/home'], {
      queryParams: { address: this.address, location: this.location },
    });
  }
}