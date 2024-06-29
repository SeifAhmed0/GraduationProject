import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PlayerService } from 'src/app/core/services/player.service';
import { RepresntorService } from 'src/app/core/services/represntor.service';

@Component({
  selector: 'app-information-request',
  
  templateUrl: './information-request.component.html',
  styleUrl: './information-request.component.scss'
})
export class InformationRequestComponent {
  model = {
    playerName: '',
    birthOfDate: '',
    height: '',
    weight: '',
    club: '',
    description: '',
  }
  model2 = {
    name: '',
    birthOfDate: '',
    height: '',
    weight: '',
    club: '',
  }
  reqId:any
  errMessage: string = '';
  isLoading: boolean = false;
constructor(private _ActivatedRoute:ActivatedRoute,
  private _RepresntorService:RepresntorService,
  private _ToastrService:ToastrService,
private _Router:Router,
){}

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next: (params) => {
      this.reqId = params.get('id');
      console.log(this.reqId);
      this._RepresntorService.getSinglePlayerToAccept(this.reqId).subscribe({
        next:(res)=>{
        this.model.playerName=res.data.requestPlayerInfoToCompare[0].playerName;
          this.model.birthOfDate=res.data.requestPlayerInfoToCompare[0].birthOfDate;
          this.model.height=res.data.requestPlayerInfoToCompare[0].height;
          this.model.weight=res.data.requestPlayerInfoToCompare[0].weight;
          this.model.club=res.data.requestPlayerInfoToCompare[0].club;
          this.model.description=res.data.requestPlayerInfoToCompare[0].description;
          const originalDateString = this.model.birthOfDate;
    const originalDate = new Date(originalDateString);
    
    const formattedDate = originalDate.toISOString().split('T')[0];
    this .model.birthOfDate =formattedDate


        this.model2.name=res.data.singleMadelWantToCompare[0].name;
          this.model2.birthOfDate=res.data.singleMadelWantToCompare[0].birthOfDate;
          this.model2.height=res.data.singleMadelWantToCompare[0].height;
          this.model2.weight=res.data.singleMadelWantToCompare[0].weight;
          this.model2.club=res.data.singleMadelWantToCompare[0].club;
          const originalDateString2 = this.model2.birthOfDate;
    const originalDate2 = new Date(originalDateString2);
    
    const formattedDate2 = originalDate2.toISOString().split('T')[0];
    this .model2.birthOfDate =formattedDate2
        }
      })
    }
  });


}
acceptReq(){
  this._RepresntorService.acceptEditInfo(this.reqId).subscribe({
    next:(res)=>{
      console.log(res);
      this._Router.navigate(['/MangeIssues'])

      this._ToastrService.success('The Request has been Accepted ');


    },
    error:(err)=>{
      this.errMessage = err.error.data
    }
  })

}
rejectReq(){
  this._RepresntorService.rejectEditInfo(this.reqId).subscribe({
    next:(res)=>{
      console.log(res);
      this._Router.navigate(['/MangeIssues'])

      this._ToastrService.success('The Request has been rejected ');


    },
    error:(err)=>{
      this.errMessage = err.error.data
    }
    
  })

}
}
