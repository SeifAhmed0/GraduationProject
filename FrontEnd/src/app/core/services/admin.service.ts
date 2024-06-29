import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
baseUrl:string='http://localhost:3000'
  constructor(private _HttpClient:HttpClient) { }


  /* 𝗥𝗘𝗣𝗥𝗘𝗦𝗡𝗧𝗢𝗥 𝗙𝗨𝗡𝗖𝗧𝗜𝗢𝗡𝗦 */
  addAgentRepresentor(userData:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl +'/admin/representor/',userData)
  }

  getAllAgents():Observable<any>{
    return this._HttpClient.get(this.baseUrl +'/admin/representor')
  }
  getSingleAgents(id:string):Observable<any>{
    return this._HttpClient.get(this.baseUrl +`/admin/representor/${id}`)
  }

  deleteAgent(id:string):Observable<any>{
   return this._HttpClient.delete(this.baseUrl + `/admin/representor/${id}`)
  }

  updateAgent(id:string,item:any):Observable<any>{
    return this._HttpClient.put(this.baseUrl+`/admin/representor/${id}`,item)
  }

//////////////////////////////////////////////////////////////////////////////////

  /* 𝗠𝗜𝗡𝗜𝗦𝗘𝗧𝗬 𝗙𝗨𝗡𝗖𝗧𝗜𝗢𝗡𝗦 */
  gatAgentsOfMinistry():Observable<any>{
    return this._HttpClient.get(this.baseUrl+'/admin/agent')
  }

  deleteAgentOfMinistry(id:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `/admin/agent/${id}`)
   }

   addAgentofMinistry(userData:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl +'/admin/agent/',userData)
  }

  getSingleAgenOfMinistry(id:string):Observable<any>{
    return this._HttpClient.get(this.baseUrl +`/admin/agent/${id}`)
  }
  updateAgentOfMinistry(id:string,item:any):Observable<any>{
    return this._HttpClient.put(this.baseUrl+`/admin/agent/${id}`,item)
  }

  //////////////////////////////////////////////////////////////////////////////////

  /* ​‌‍‌‍‍𝗔𝘀𝘀𝗼𝘀𝗶𝗮𝘁𝗶𝗼𝗻​ 𝗙𝗨𝗡𝗖𝗧𝗜𝗢𝗡𝗦 */

  gatAssosiation():Observable<any>{
    return this._HttpClient.get(this.baseUrl+'/admin/association')
  }

  deleteAssosiation(id:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `/admin/association/${id}`)
   }

   addAssosiation(userData:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl +'/admin/association',userData)
  }

  getSingleAssosiation(id:string):Observable<any>{
    return this._HttpClient.get(this.baseUrl +`/admin/association/${id}`)
  }

  showMember(associationName:string):Observable<any>{
    return this._HttpClient.get(this.baseUrl +`/admin/representor/associationMember/${associationName}`)
  }
  updateAgentOfAssosation(id:string,item:any):Observable<any>{
    return this._HttpClient.put(this.baseUrl+`/admin/association/${id}`,item)
  }
}
