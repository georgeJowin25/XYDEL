import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OtpService } from '../../Services/otp.Service';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})

export class OtpPage implements OnInit, OnDestroy {

  errorMessage: string = '';
  successMessage: string = '';
  timer: number = 60;
  mobileNumber!: number;
  otp!: number;
  isDisabled = true;
  resendDisabled: boolean = true;

  private timerInterval: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private otpService: OtpService,
    private storage: Storage
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.mobileNumber = params['mobileNumber'];
    });
    this.initStorage();
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  async initStorage() {
    await this.storage.create();
  }

  handleOtpChange(text: number) {
    const otpString = String(text);
    if (otpString.length === 6) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }
  onKeyPress(event: KeyboardEvent) {
    const key = event.key;
    if (!/^\d*$/.test(key)) {
      event.preventDefault();
    }
  }

  handleVerifyOTP() {
    this.router.navigate(['/location']);
    this.otpService
      .verifyOTP(this.mobileNumber, this.otp)
      .pipe(
        tap((response: any) => {
          if (response.status === 'OK') {
            const id = response.data.id;
            this.storage.set('id', id);
            this.router.navigate(['/location']);
          } else if (
            response.status === 'INTERNAL_SERVER_ERROR' &&
            response.message === 'Otp Expired.Please Generate The New OTP'
          ) {
            this.errorMessage = response.message || 'OTP verification failed';
          } else {
            this.errorMessage = response.message || 'OTP verification failed';
          }
        })
      )
    .subscribe();
  }

  handleEditNumber() {
    this.router.navigate(['/mobile-number']);
  }

  setResendDisabled(disabled: boolean) {
    this.resendDisabled = disabled;
  }

  handleResendOTP() {
    this.setResendDisabled(true);
    this.timer = 60;
    this.startTimer();
    this.otpService
      .resendOTP(this.mobileNumber)
      .pipe(
        tap((response) => {
          if (response.status === 'OK') {
            this.successMessage = response.message;
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

  private startTimer() {
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
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }
}
