import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  private apiUrl = 'http://192.168.29.232:7001/xydel/app/v1/otp';

  constructor(private http: HttpClient) {}

  verifyOTP(mobileNumber: number, otp: number): Observable<any> {
    const requestBody = {
      mobileNumber: mobileNumber,
      otp: otp,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/verify`, requestBody, { headers });
  }

  resendOTP(mobileNumber: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}`, { mobileNumber }, { headers });
  }
}
