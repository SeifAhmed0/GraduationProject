import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RepresntorService } from 'src/app/core/services/represntor.service';

@Component({
  
  selector: 'app-mange-player',
  templateUrl: './mange-player.component.html',
  styleUrls: ['./mange-player.component.scss']
})
export class MangePlayerComponent {
  @ViewChild('top') topElement!: ElementRef;
  allPlayers:any={}
  term:string=''
  p:any
   total :any
constructor(    private _Router:Router,private _RepresntorService:RepresntorService, private _ToastrService: ToastrService){}

ngOnInit(): void {
  this._RepresntorService.getAllPlayers().subscribe({
    next:(res)=>{      
      this.allPlayers = res.data;
      console.log(res);
      
      
    },error:(err)=>{
      console.log(err);
    }
  })
  
}
pageChanged(eve: any) {
  console.log(eve);
  this.topElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  this.p=eve
}

deletePlayer(id:string){
  this._RepresntorService.deletePlayer(id).subscribe({
    next:(res)=>{
      console.log(res);
      this._ToastrService.success('The player has been Deleted successfully');
      this._RepresntorService.getAllPlayers().subscribe({
        next:(res)=>{
          this.allPlayers =res.data
        }
      })
      this._Router.navigate(['/mangePlayer'])
  
    }
  
  })
  }
}
