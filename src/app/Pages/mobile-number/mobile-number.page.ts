import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OtpService } from './Api.Services';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';

@Component({
  selector: 'app-mobile-number',
  templateUrl: './mobile-number.page.html',
  styleUrls: ['./mobile-number.page.scss'],
})
export class MobileNumberPage {
  readonly phoneMask: MaskitoOptions = {
    mask: ['+', '9', '1', ' ',  /\d/, /\d/, /\d/,   /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],};
  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  mobileNumber!: number;
  isButtonDisabled = true;
  apiResponse: string | { message: string } = 'null';
  formattedMobileNumber!: string;

  constructor(
    private router: Router,
    private otpService: OtpService // Inject the OtpService
  ) {}

  handleNumberChange(text: string) {
    const numericInput = text.replace(/\D/g, ''); // Remove non-numeric characters
    this.mobileNumber = parseInt(numericInput.substring(2), 10); // Convert the input to a number and remove the "+91" prefix
    const formattedInput = numericInput.substring(2); // Remove the "+91" prefix from the displayed input
    const maskedInput = `+91 ${formattedInput.slice(0, 3)}${formattedInput.slice(3, 6)}${formattedInput.slice(6)}`;
    this.formattedMobileNumber = maskedInput;
    if (numericInput.length === 1 && (numericInput[0] === '9' || numericInput[0] === '1')) {
      // If the user enters only the first "9" or "1," display it with the "+91" prefix
      const maskedInput = `+91 ${numericInput[0]}`;
      this.formattedMobileNumber = maskedInput;
      this.isButtonDisabled = true;
    }
    if (numericInput.length === 12) {
      this.isButtonDisabled = false; // Enable the button if the input is a valid 10-digit number without the "+91" prefix
    } else {
      this.isButtonDisabled = true;
    }
  }

  handleGetOTP() {
    if (!this.isButtonDisabled) {
      this.otpService.getOtp(this.mobileNumber)
        .pipe(
          tap((data) => {
            if (data.ok) {
              // Request succeeded
              this.apiResponse = data;
              this.router.navigate(['otp'], { queryParams: { mobileNumber: this.mobileNumber } });
            } else {
              // Request failed
              this.apiResponse = { message: data.message || 'Error occurred.' };
              console.error(data);
              this.router.navigate(['otp'], { queryParams: { mobileNumber: this.mobileNumber } });
            }
          }),
          catchError((error) => {
            // Handle any errors that occurred during the API call
            console.error(error);
            this.router.navigate(['otp'], { queryParams: { mobileNumber: this.mobileNumber } });
            // Return an empty result to avoid breaking the observable chain
            return of();
          })
        )
        .subscribe();
     }
  }
}
