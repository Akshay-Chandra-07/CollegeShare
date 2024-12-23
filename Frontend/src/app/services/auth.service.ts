import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl:string = "http://localhost:5000/api/auth"

  constructor(private http:HttpClient) { }

  register(user:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/register`,user);
  }
  
  login(user:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/login`,user);
  }
}
