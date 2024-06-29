import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepresntorService {
  baseUrl: string = 'http://localhost:3000'
  constructor(private _HttpClient: HttpClient) { }

  getAllPlayers(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + '/representor/player')
  }
  addPlayer(userData: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + '/representor/player', userData)
  }

  deletePlayer(id: string): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `/representor/player/${id}`)
  }

  getSinglePlayer(id: string): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `/representor/player/${id}`)
  }
  getPlayerDetals(id: string): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `/representor/player/Details/${id}`)
  }

  updatePlayer(id: string, item: any): Observable<any> {
    return this._HttpClient.put(this.baseUrl + `/representor/player/${id}`, item)
  }

  addChampion(userData: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + '/representor/championship', userData)
  }

  getAllChampionships(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + '/representor/championship')
  }

  deleteChampionships(id: string): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `/representor/championship/${id}`)
  }
  
  getSingleChampionship(id: string): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `/representor/championship/${id}`)
  }

  editChampionship(id: any,item: any): Observable<any> {
    return this._HttpClient.put(this.baseUrl + `/representor/championship/${id}`, item)
  }

  addMedal(userData: any): Observable<any> {
    return this._HttpClient.post(this.baseUrl + '/representor/medal', userData)
  }
  getSingleMedal(id: string): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `/representor/medal/${id}`)
  }
  editMadal(id: any,item: any): Observable<any> {
    return this._HttpClient.put(this.baseUrl + `/representor/medal/${id}`, item)
  }
  deleteMedal(id: string): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `/representor/medal/${id}`)
  }
  getAllIssues(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + '/representor/playerSharedIssues')
  }
  getSinglePlayerToAccept(id:any): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `/representor/PlayerInfoIssues/${id}`)
  }
  acceptEditInfo(id:any): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `/representor/PlayerInfoIssues/accept/${id}`,{})
  }
  rejectEditInfo(id:any): Observable<any> {
    return this._HttpClient.put(this.baseUrl + `/representor/PlayerInfoIssues/${id}`,{})
  }

  //request to edit Medal
  getSingleMedalToAccept(id:any): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `/representor/playerEditIssues/${id}`)
  }
  acceptEditMedal(id:any): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `/representor/playerEditIssues/accept/${id}`,{})
  }
  rejectEditMedal(id:any): Observable<any> {
    return this._HttpClient.put(this.baseUrl + `/representor/playerEditIssues/${id}`,{})
  }
  //request to add medal
  getSingleMedalToAddAccept(id:any): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `/representor/playerAddIssues/${id}`)
  }
  acceptAddMedal(id:any): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `/representor/playerAddIssues/accept/${id}`,{})
  }
  rejectAddMedal(id:any): Observable<any> {
    return this._HttpClient.put(this.baseUrl + `/representor/playerAddIssues/${id}`,{})
  }
}
