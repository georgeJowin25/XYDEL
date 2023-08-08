import { Component } from '@angular/core';
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

  handleGetOTP() {
    if (!this.isButtonDisabled) {
      this.router.navigate(['otp'], {
        queryParams: { mobileNumber: this.mobileNumber },
      });
      this.otpService
        .getOtp(this.mobileNumber)
        .pipe(
          tap((data) => {
            if (data.ok) {
              // Request succeeded
              this.apiResponse = data;
              this.router.navigate(['otp'], {
                queryParams: { mobileNumber: this.mobileNumber },
              });
            } else {
              // Request failed
              this.apiResponse = { message: data.message || 'Error occurred.' };
              console.error(data);
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
