import { Component, ElementRef, ViewChild } from '@angular/core';
import { RepresntorService } from 'src/app/core/services/represntor.service';

@Component({
  selector: 'app-mange-issues',
  templateUrl: './mange-issues.component.html',
  styleUrl: './mange-issues.component.scss'
})
export class MangeIssuesComponent {
  @ViewChild('top') topElement!: ElementRef;
constructor(private _RepresntorService:RepresntorService){}
playerInfoIssues:any={}
requestMedal:any={}
term:string=''
p:any
 total :any
ngOnInit(): void {
  this._RepresntorService.getAllIssues().subscribe({
    next:(res)=>{
      this.playerInfoIssues=res.data.playerInfoIssues  
      this.requestMedal=res.data.requestMedal  
      console.log(this.playerInfoIssues,this.requestMedal);
      

    }
  })
  
}
pageChanged(eve: any) {
  console.log(eve);
  this.topElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  this.p=eve
}

}
