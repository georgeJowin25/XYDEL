import { Component } from '@angular/core';
import { Position } from '@capacitor/geolocation';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage {
  constructor(private router: Router) {}

  async handleAllowLocation() {
    try {
      const permissionStatus = await Geolocation.checkPermissions();
      if (permissionStatus.location === 'granted') {
        const position: Position = await Geolocation.getCurrentPosition();
        const { latitude, longitude } = position.coords;
        const addressResponse = await this.reverseGeocode(latitude, longitude);
        if (addressResponse) {
          const { postcode } = addressResponse;
          const { suburb, city, state, country } = addressResponse;
          const formattedAddress = `${suburb}, ${city}, ${state}, ${country}`;
          console.log(formattedAddress);
          this.router.navigate(['/tabs'], {
            queryParams: { address: formattedAddress, pinCode: postcode },
          });
        } else {
          // Handle case when address is not found
          console.log('Address not found');
        }
      } else {
        // Location permission denied, navigate to manual location page
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
