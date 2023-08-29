import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { mobileService } from '../../Services/mobile.Service';
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

  constructor(private router: Router, private mobileService: mobileService) {}

  handleNumberChange(text: string) {
    const numberString = String(text);
    if (numberString.length === 10) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
  }
  onKeyPress(event: KeyboardEvent) {
    const key = event.key;
    if (!/^\d*$/.test(key)) {
      event.preventDefault();
    }
  }

  handleGetOTP() {
    this.router.navigate(['otp'], {
      queryParams: { mobileNumber: this.mobileNumber },
    });
    if (!this.isButtonDisabled) {
      this.mobileService
        .getOtp(this.mobileNumber)
        .pipe(
          tap((response) => {
            if (response.status === 'OK') {
              this.router.navigate(['/otp'], {
                queryParams: { mobileNumber: this.mobileNumber },
              });
            } else {
              console.error(response);
            }
          }),
          catchError((error) => {
            console.error(error);
            return of();
          })
        )
        .subscribe();
    }
  }
}
