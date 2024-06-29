import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RepresntorService } from 'src/app/core/services/represntor.service';
@Component({
  selector: 'app-add-medal-req',

  templateUrl: './add-medal-req.component.html',
  styleUrl: './add-medal-req.component.scss'
})
export class AddMedalReqComponent {
  reqId:any
  errMessage: string = '';
  isLoading: boolean = false;
  nameArray:any[] = [];
  constructor(private _ActivatedRoute:ActivatedRoute,
    private _RepresntorService:RepresntorService,
    private _ToastrService:ToastrService,
  private _Router:Router,
  ){}
  model: any = {
    MedalAchievementDate: null,
    typeOfMedal: '',
    isWin: true,
    year: null,
    championshipID: null,
    playerId:'',
    id:'',
  }



  ngOnInit(): void {
    
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.reqId = params.get('id');
        console.log(this.reqId);
        this._RepresntorService.getSingleMedalToAddAccept(this.reqId).subscribe({
          next:(res)=>{
            console.log(res.data[0].typeOfMedal);
            
          this.model.MedalAchievementDate=res.data[0].MedalAchievementDate;
            this.model.typeOfMedal=res.data[0].typeOfMedal;
            this.model.isWin=res.data[0].isWin;
            this.model.year=res.data[0].year;
            this.model.championshipID=res.data[0].championshipID;
            this.model.description=res.data[0].description;
  
            const originalDateString = this.model.MedalAchievementDate;
      const originalDate = new Date(originalDateString);
      
      const formattedDate = originalDate.toISOString().split('T')[0];
      this .model.MedalAchievementDate =formattedDate
  
          },error:(err)=>{          
            
            this.errMessage=err.error.message

            this.model.MedalAchievementDate=err.error.data.requestedMadel[0].MedalAchievementDate;
            this.model.typeOfMedal=err.error.data.requestedMadel[0].typeOfMedal;
            this.model.isWin=err.error.data.requestedMadel[0].isWin;
            this.model.year=err.error.data.requestedMadel[0].year;
            this.model.championshipID=err.error.data.requestedMadel[0].championshipID;
            this.model.description=err.error.data.requestedMadel[0].description;

            this.model.playerId=err.error.data.medalAlreadyRejecter.playerId;
            this.model.id=err.error.data.medalAlreadyRejecter.id;
  
            const originalDateString = this.model.MedalAchievementDate;
      const originalDate = new Date(originalDateString);
      
      const formattedDate = originalDate.toISOString().split('T')[0];
      this .model.MedalAchievementDate =formattedDate
          }
        })
        
      }
    });

    this._RepresntorService.getAllChampionships().subscribe({
      next:(res)=>{
        let data =res.data
        
        for (let i = 0; i < data.length; i++) {
          this.nameArray.push(data[i])
          // this.nameArray.push(data[i].id+"-"+data[i].name +"-"+ data[i].typeOfChampionship +"-"+data[i].gender)
          
        }
        console.log( this.nameArray);
        
      }
    })
  
  }





  acceptReq(){
    this._RepresntorService.acceptAddMedal(this.reqId).subscribe({
      next:(res)=>{
        console.log(res);
        this._Router.navigate(['/MangeIssues'])

        this._ToastrService.success('The Request has been Accepted ');
  
  
      },
      error:(err)=>{
        console.log(err);
        
        this.errMessage = err.error.data
      }
    })
  
  }
  rejectReq(){
    let x = typeof this.reqId
    console.log(x);
    
    this._RepresntorService.rejectAddMedal(this.reqId).subscribe({
      next:(res)=>{
        console.log(res);
        this._Router.navigate(['/MangeIssues'])
  
        this._ToastrService.success('The Request has been rejected ');
  
  
      },
      error:(err)=>{
        console.log(err);
        
        this.errMessage = err.error.data
      }
      
    })
  
  }

}
