import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  baseUrl: string = 'http://localhost:3000'
  constructor(private _HttpClient:HttpClient) { }
  getPlayerInformaion(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + '/player/getPlayerDetails')
  }
  reqToAddMedal(userData: any): Observable<any> {
    return this._HttpClient.post(this.baseUrl + '/player/requestToAddMadel', userData)
  }
  reqToEditMedal(userData: any,id:any): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `/player/reqEdit/${id}`, userData)
  }
  getAllChampionships(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + '/player/getAllChampion')
  }
  getSingleMedal(id: string): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `/player/getSingelMadel/${id}`)
  }
  getSinglePlayerdata(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + '/player/getSinglePlayer')
  }
  reqToEditInfo(userData: any): Observable<any> {
    return this._HttpClient.post(this.baseUrl + '/player/requestPlayerInfo', userData)
  }


}
