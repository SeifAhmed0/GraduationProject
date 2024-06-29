import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/core/services/player.service';
import { RepresntorService } from 'src/app/core/services/represntor.service';

@Component({
  selector: 'app-player-home',

  templateUrl: './player-home.component.html',
  styleUrl: './player-home.component.scss'
})
export class PlayerHomeComponent {
  constructor( private _ActivatedRoute:ActivatedRoute, private _RepresntorService:RepresntorService, private _PlayerService:PlayerService){}
  playerId:any;
  playerAge: any
  playerDetails:any={}
  laocalArray:any=[];
  continentalArray:any=[];
  internationalArray:any=[];
  ngOnInit(): void {  
    // this._ActivatedRoute.paramMap.subscribe({
    //   next:(params)=>{
    //     this.playerId = params.get('id')
        
    //   }
    // })

    this._PlayerService.getPlayerInformaion().subscribe({
      next:(res)=>{
       this.playerDetails = res.data[0];
       console.log( this.playerDetails);
       this.playerAge = res.data[0].birthOfDate
       const birthDate = new Date(this.playerAge);
       const today = new Date();
   
       let age = today.getFullYear() - birthDate.getFullYear();
       const monthDifference = today.getMonth() - birthDate.getMonth();
   
       if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
         age--;
       }
       this.playerAge =age;
     
       
        
      }
    })

    this._PlayerService.getPlayerInformaion().subscribe({
      next:(res)=>{
        let data =res.data
        for (let i = 0; i < data.length; i++) {
          if(data[i].typeOfChampionship=="Local"){
            this.laocalArray.push(data[i])
           
          }
          else if(data[i].typeOfChampionship=="Continental"){
            this.continentalArray.push(data[i])
          }
          else if(data[i].typeOfChampionship=="International"){
            this.internationalArray.push(data[i])
          }
          
        }
      }
    })
  }
}
