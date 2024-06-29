import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MinistryService {
  private perdictionSubject = new BehaviorSubject<any[]>([]);
  private playersSubject = new BehaviorSubject<any[]>([]);
  private sendallPlayersInfoSubject = new BehaviorSubject<any[]>([]);
  private lastFiveYearsPlayerInfoSubject = new BehaviorSubject<any[]>([]);

  perdiction$ = this.perdictionSubject.asObservable();
  players$ = this.playersSubject.asObservable();
  sendallPlayersInfo$ = this.sendallPlayersInfoSubject.asObservable();
  lastFiveYearsPlayerInfo$ = this.lastFiveYearsPlayerInfoSubject.asObservable();

  setPerdiction(perdiction: any[]) {
    this.perdictionSubject.next(perdiction);
  }

  setPlayers(players: any[]) {
    this.playersSubject.next(players);
  }

  setSendallPlayersInfo(sendallPlayersInfo: any[]) {
    this.sendallPlayersInfoSubject.next(sendallPlayersInfo);
  }

  setLastFiveYearsPlayerInfo(lastFiveYearsPlayerInfo: any[]) {
    this.lastFiveYearsPlayerInfoSubject.next(lastFiveYearsPlayerInfo);
  }
  baseUrl: string = 'http://localhost:3000'
  constructor(private _HttpClient:HttpClient) { }

  getAllPlayersInAssos(id:any): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `/agent/playerInfo/getAllPlayersInSingleAssociation/${id}`)
  }
  getAllAgentsOfMinistry(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + '/agent/associationInfo/getAllAssociation')
  }
  getPlayerDetails(playerID:string,AssosID:string): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `/agent/playerInfo/getAllPlayerDetails/${playerID}/${AssosID}`)
  }
  genModel(userData: any): Observable<any> {
    return this._HttpClient.post(this.baseUrl + '/agent/useModal', userData)
  }
  
}
