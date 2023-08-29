import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class mobileService {

  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiBase;

  getOtp(mobileNumber: number): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = JSON.stringify({ mobileNumber });
    
    return this.http.post(`${this.apiUrl}/otp`, body, { headers });
  }
}
