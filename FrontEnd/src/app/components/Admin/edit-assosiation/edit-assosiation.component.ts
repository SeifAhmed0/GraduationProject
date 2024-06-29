import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-assosiation',
  templateUrl: './edit-assosiation.component.html',
  styleUrls: ['./edit-assosiation.component.scss']
})
export class EditAssosiationComponent {
  constructor(private _AdminService:AdminService,
    private _ToastrService: ToastrService,
    private _Router:Router,
    private _ActivatedRoute:ActivatedRoute,){}
    model = {
      associationName: '',
    }

    errMessage:string='';
  agentId:any;
  isLoading:boolean=false;
  editAssociation:FormGroup = new FormGroup({
    associationName:new FormControl('',[Validators.required ,Validators.pattern(/^[A-Za-z]+(([' -][A-Za-z])?[A-Za-z]*)*$/)]),  })
    ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          this.agentId = params.get('id');
          console.log(this.agentId);
          this._AdminService.getSingleAssosiation(this.agentId).subscribe({
            next:(res)=>{
              this.model.associationName=res.data[0].associationName;  
            }
          })
        }
      })
    }


    handelForm(){
      this.isLoading=true
      this._AdminService.updateAgentOfAssosation(this.agentId,this.editAssociation.value).subscribe({
        next:()=>{
          this.isLoading=false; 
          this._Router.navigate(['/mangeAssosiation'])
          this._ToastrService.success('The Association has been Updated successfully');
          
        },error:(err)=>{
          this.isLoading=false; 
          this.errMessage = err.error.data
        }
  
      })
      
    }
}
