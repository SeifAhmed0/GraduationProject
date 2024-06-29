import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MinistryService } from 'src/app/core/services/ministry.service';

@Component({
  selector: 'app-players-in-assos',
  templateUrl: './players-in-assos.component.html',
  styleUrls: ['./players-in-assos.component.scss']
})
export class PlayersInAssosComponent {
  @ViewChild('top') topElement!: ElementRef;
  allPlayers:any={}
  associd:any
  notFound:string=''
  term:string=''
  p:any
   total :any
   isLoading:boolean=false;
  modelObject: { associationId: string; playersIDs: string[] } = {
    associationId: '',
    playersIDs: []
  };
  constructor(private _MinistryService:MinistryService ,
    private _ActivatedRoute:ActivatedRoute ,
    private _ToastrService:ToastrService,
    private _Router:Router
  
  ){}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.associd = params.get('id');
        this.modelObject.associationId = this.associd;
      }
      
    });
    this._MinistryService.getAllPlayersInAssos( this.associd).subscribe({
      next:(res)=>{
        this.allPlayers = res.data;
        },error:()=>{
          this.notFound='notfounded'
        }
    })

  }

  pageChanged(eve: any) {
    
    this.p=eve
    this.topElement.nativeElement.scrollIntoView({ behavior: 'smooth' });

  }

  addToArray(id:string){
    this.modelObject.playersIDs.push(id)
    
    

  }
  removeFromArray(id: string) {
    this.modelObject.playersIDs = this.modelObject.playersIDs.filter(playerID => playerID !== id);
  }
  predict(){
    this.isLoading = true
    if(this.modelObject.playersIDs.length>1){
      this._MinistryService.genModel(this.modelObject).subscribe({
        next:(res)=>{
          this.isLoading = false;
          console.log(res);
          this._MinistryService.setPerdiction(res.data.perdiction)
          this._MinistryService.setPlayers(res.data.players)
          this._MinistryService.setSendallPlayersInfo(res.data.allPlayersMadalforever)
          this._MinistryService.setLastFiveYearsPlayerInfo(res.data.allPlayersMadalLast5Years)
        this._Router.navigate([`/predictedPlayers`])


          

        },error:()=>{
          this.isLoading = false;
        }

      })
    }
    else{
      this._ToastrService.error('Select more than 2 Players')
    }

  }

  clear(){
    this.modelObject.playersIDs=[]
  }

}
