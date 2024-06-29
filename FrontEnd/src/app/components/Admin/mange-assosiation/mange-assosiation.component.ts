import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-mange-assosiation',
  templateUrl: './mange-assosiation.component.html',
  styleUrls: ['./mange-assosiation.component.scss']
})
export class MangeAssosiationComponent {
  @ViewChild('top') topElement!: ElementRef;

constructor(private _AdminService:AdminService,private _ToastrService: ToastrService){}
allAgents:any={}
p:any
total :any
term:string=''

  ngOnInit(): void {
  this._AdminService.gatAssosiation().subscribe({
    next:(res)=>{
      console.log(res);
      this.allAgents =res.data
    }
  })
    
  }
  pageChanged(eve: any) {
    console.log(eve);
    this.topElement.nativeElement.scrollIntoView({ behavior: 'smooth' });

    
    this.p=eve
  }
  deleteAgent(id:string){
  this._AdminService.deleteAssosiation(id).subscribe({
    next:(res)=>{
      console.log(res);
      this._AdminService.gatAssosiation().subscribe({
        next:(res)=>{
          this.allAgents =res.data
          this._ToastrService.success('The Association has been deleted successfully');

        }
      })
  
    }
  
  })
  }
}
