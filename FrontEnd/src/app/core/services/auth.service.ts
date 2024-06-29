import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _HttpClient:HttpClient) { }
  login(userData:object):Observable<any>{
    return this._HttpClient.post(`http://localhost:3000/login`,userData)
  }
  logout():Observable<any>{
    return this._HttpClient.delete(`http://localhost:3000/singleLogout`)
  }
}
