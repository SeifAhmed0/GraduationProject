import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RepresntorService } from 'src/app/core/services/represntor.service';

@Component({
  selector: 'app-mange-champion',
  templateUrl: './mange-champion.component.html',
  styleUrls: ['./mange-champion.component.scss']
})
export class MangeChampionComponent {
  @ViewChild('top') topElement!: ElementRef;
  constructor(private _RepresntorService:RepresntorService,private _ToastrService:ToastrService){}
  allChampionships:any={}
  p:any
  total :any
  term:string=''
  
    ngOnInit(): void {
    this._RepresntorService.getAllChampionships().subscribe({
      next:(res)=>{
        console.log(res);
        this.allChampionships =res.data
      }
    })
      
    }
    pageChanged(eve: any) {
      console.log(eve);
      this.topElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
      this.p=eve
    }
    
    deletechampion(id:string){
    this._RepresntorService.deleteChampionships(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._RepresntorService.getAllChampionships().subscribe({
          next:(res)=>{
            this.allChampionships =res.data
            this._ToastrService.success('The Champion has been Deleted successfully');

          }
        })
    
      }
    
    })
    }
}
