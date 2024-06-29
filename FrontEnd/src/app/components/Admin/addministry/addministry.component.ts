import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addministry',
  templateUrl: './addministry.component.html',
  styleUrls: ['./addministry.component.scss']
})
export class AddministryComponent {
  constructor(private _AdminService:AdminService,private _ToastrService: ToastrService,private _Router:Router){}
  isLoading:boolean=false;
  errMessage:string=''
  addAgentOfMinisetry:FormGroup = new FormGroup({
    name:new FormControl('',[Validators.required ,Validators.pattern(/^[A-Za-z]+(([' -][A-Za-z])?[A-Za-z]*)*$/)]),
    email:new FormControl('',[Validators.required ,Validators.email]),
    password:new FormControl('',[Validators.required ,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
  
  })

  handelForm(){
    const userData= this.addAgentOfMinisetry.value;
    this.isLoading=true
    if(this.addAgentOfMinisetry.valid){
      this._AdminService.addAgentofMinistry(userData).subscribe({
        next:()=>{
          this.isLoading=false; 
      this._Router.navigate(['/mangeMinistry'])
          this._ToastrService.success('The account has been added successfully');
          this.errMessage=''
          
        },error:(err)=>{
          this.isLoading=false; 
          this.errMessage=err.error.data
          
        }
      })
    }
  }
}
