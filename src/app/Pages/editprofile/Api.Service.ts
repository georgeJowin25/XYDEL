import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
}) 
 

export class profileService {
    constructor(private http: HttpClient) {}
    private apiUrl = environment.apiUserSave;
    
  sendUserDetails(firstName: string, lastName: string, emailId: string, mobileNumber: string, userProfileDoc :string , gender: string):Observable<any>{
   const  requestBody = {
        firstName: firstName,
        lastName: lastName,
        emailId: emailId,
        mobileNumber: mobileNumber,
        gender: gender,
        userProfileDoc: userProfileDoc,
      };
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
    return this.http.post(`${this.apiUrl}`, requestBody, { headers });
  }
}