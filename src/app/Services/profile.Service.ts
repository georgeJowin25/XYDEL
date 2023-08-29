import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
}) 
 

export class profileService {
    constructor(private http: HttpClient) {}
    private apiUrl = environment.apiBase;
    
    sendUserDetails(formData: any,id: string): Observable<any> {
      const params = new HttpParams().set('id', id);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
  
      return this.http.post(`${this.apiUrl}/user/details/add`, formData, { headers,params });
    }

  getUserDetails(id: string): Observable<any> {
    const params = new HttpParams().set('id', id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.apiUrl}/user/details`, { headers, params });
  }
  
}