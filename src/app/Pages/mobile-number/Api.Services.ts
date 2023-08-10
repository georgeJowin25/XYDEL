import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class OtpService {
 

  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiBase;
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
