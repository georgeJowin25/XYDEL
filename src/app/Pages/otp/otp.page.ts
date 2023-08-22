import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { OtpService } from './Api.Service';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit, OnDestroy {
  errorMessage: any;
  timer: number = 60;
  apiResponse: any;
  mobileNumber!: number;
  otp!: number;
  isDisabled = true;
  private subscription: Subscription = new Subscription();
  resendDisabled: boolean = true;

  private timerInterval: any; // Store the timer interval reference

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private otpService: OtpService,
    private storage: Storage // Inject the OtpService
  ) {}

  ngOnInit(): void {
    // Get the mobile number from the query params
    this.subscription.add(
      this.route.queryParams.subscribe((params) => {
        this.mobileNumber = params['mobileNumber'];
      })
    );
    this.initStorage(); // Initialize Ionic Storage
    // Start the timer
    this.startTimer();
  }

  ngOnDestroy(): void {
    // Clear the timer interval before destroying the component
    this.clearTimer();
    this.subscription.unsubscribe();
  }

  async initStorage() {
    await this.storage.create(); // Initialize Ionic Storage
  }

  handleOtpChange(text: number) {
    const otpString = String(text); // Convert the number to a string
    if (otpString.length === 6) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }
  onKeyPress(event: KeyboardEvent) {
    const key = event.key;
    // Check if the pressed key is a numeric character
    if (!/^\d*$/.test(key)) {
      event.preventDefault(); // Prevent entering non-numeric characters
    }
  }

  handleVerifyOTP() {
    this.router.navigate(['/location']);
    this.subscription.add(
      this.otpService
        .verifyOTP(this.mobileNumber, this.otp)
        .pipe(
          tap((response: any) => {
            console.log('API Response:', response); // Add this log to inspect the response

            if (response.status === 'OK') {
              const id = response.data.id;
              this.storage.set('id', id).catch((error) => {
                console.error('Error saving id:', error);
              });
              // OTP is valid, navigate to the location screen
              this.router.navigate(['/location']);
            } else if (
              response.status === 'INTERNAL_SERVER_ERROR' &&
              response.message === 'Otp Expired.Please Generate The New OTP'
            ) {
              // OTP is expired, enable resend and show error message
              this.setResendDisabled(false);
              this.errorMessage = response.message || 'OTP verification failed';
            } else {
              // OTP is invalid, show error message
              this.errorMessage = response.message || 'OTP verification failed';
            }
          })
        )
        .subscribe()
    );
  }

  handleEditNumber() {
    this.navCtrl.navigateBack('mobile-number');
  }

  setResendDisabled(disabled: boolean) {
    this.resendDisabled = disabled;
  }

  handleResendOTP() {
    this.setResendDisabled(true);
    this.timer = 60;

    this.subscription.add(
      this.otpService.resendOTP(this.mobileNumber).subscribe({
        next: (response: any) => {
          if (response.ok) {
            // Request succeeded
            this.apiResponse = response;
          } else {
            // Request failed
            this.apiResponse = { message: 'Error occurred.' };
            console.error(response);
          }
        },
        error: (error) => {
          console.error(error);
        },
      })
    );
  }

  private startTimer() {
    // Clear the existing timer interval (if any)
    this.clearTimer();

    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.setResendDisabled(false);
        this.clearTimer();
      }
    }, 1000);
  }

  private clearTimer() {
    // Clear the timer interval
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }
}
