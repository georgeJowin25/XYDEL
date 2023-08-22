import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiBase;

  verifyOTP(mobileNumber: number, otp: number): Observable<any> {
    const requestBody = {
      mobileNumber: mobileNumber,
      otp: otp,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/otp/verify`, requestBody, { headers });
  }

  resendOTP(mobileNumber: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/otp`, { mobileNumber }, { headers });
  }
}
