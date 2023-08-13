import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OtpService } from './Api.Services';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-mobile-number',
  templateUrl: './mobile-number.page.html',
  styleUrls: ['./mobile-number.page.scss'],
})
export class MobileNumberPage {
  mobileNumber!: number;
  isButtonDisabled = true;
  apiResponse: string | { message: string } = 'null';

  constructor(
    private router: Router,
    private otpService: OtpService // Inject the OtpService
  ) {}

  handleNumberChange(text: string) {
    const numberString = String(text); // Convert the number to a string
    if (numberString.length === 10) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
  }
  onKeyPress(event: KeyboardEvent) {
    const key = event.key;
    // Check if the pressed key is a numeric character
    if (!/^\d*$/.test(key)) {
      event.preventDefault(); // Prevent entering non-numeric characters
    }
  }

  handleGetOTP() {
    this.router.navigate(['otp'], {
      queryParams: { mobileNumber: this.mobileNumber },
    });
    if (!this.isButtonDisabled) {
      this.otpService
        .getOtp(this.mobileNumber)
        .pipe(
          tap((response) => {
            if (response.status === 'OK') {
              // OTP sent successfully
              this.apiResponse = response.message; // Update the apiResponse with the success message
              this.router.navigate(['/otp'], {
                queryParams: { mobileNumber: this.mobileNumber },
              });
            } else {
              // Request failed
              this.apiResponse = {
                message: response.message || 'Error occurred.',
              };
              console.error(response);
            }
          }),
          catchError((error) => {
            // Handle any errors that occurred during the API call
            console.error(error);
            // Return an empty result to avoid breaking the observable chain
            return of();
          })
        )
        .subscribe();
    }
  }
}
