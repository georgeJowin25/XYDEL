import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  private apiUrl = 'http://192.168.29.232:7001/xydel/app/v1/otp';

  constructor(private http: HttpClient) {}

  getOtp(mobileNumber: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = JSON.stringify({ mobileNumber });

    return this.http.post(this.apiUrl, body, { headers }).pipe(
      tap(response => {
        // Handle any side effects you need, like logging or modifying data, using tap operator.
        console.log('Response received:', response);
      })
    );
  }
}
