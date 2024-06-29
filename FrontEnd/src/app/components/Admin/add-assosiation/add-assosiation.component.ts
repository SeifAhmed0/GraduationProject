import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-assosiation',
  templateUrl: './add-assosiation.component.html',
  styleUrls: ['./add-assosiation.component.scss']
})
export class AddAssosiationComponent {
  constructor(private _AdminService:AdminService,private _ToastrService: ToastrService,private _Router:Router){}
  errMessage:string='';
  isLoading:boolean=false;
  addAssociation:FormGroup = new FormGroup({
    associationName:new FormControl('',[Validators.required ,Validators.pattern(/^[A-Za-z]+(([' -][A-Za-z])?[A-Za-z]*)*$/)]),
  
  })

  handelForm(){
    const userData= this.addAssociation.value;
    this.isLoading=true
    if(this.addAssociation.valid){
      this._AdminService.addAssosiation(userData).subscribe({
        next:()=>{
          this.isLoading=false; 
      this._Router.navigate(['/mangeAssosiation'])
          this._ToastrService.success('The Association has been added successfully');
          this.errMessage=''
          
        },error:(err)=>{
          console.log(err);
          
          this.isLoading=false; 
          this.errMessage=err.error.data
          
        }
      })
    }
  }
}
