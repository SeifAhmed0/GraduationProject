import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
errMessage:string='';
isLoading:boolean=false;
visible:boolean=false;
changeType:boolean=false;
constructor(private _AuthService:AuthService,private _Router:Router){}
  login:FormGroup=new FormGroup({
    email:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  })

  handelForm(){
    const userData=this.login.value
    this.isLoading=true
   if(this.login.valid){
    this._AuthService.login(userData).subscribe({
      next:(res)=>{
        if(res.apiStatus==true)
        this.isLoading=false; 
      let type = res.data.type
      console.log(res);
      
        localStorage.setItem('_token' ,res.data.token)
        localStorage.setItem('_type',type)
        if (type == "admin") {
           this._Router.navigate(['/MangeRepresntor']) 
        }else if(type == "representorOfAssociation"){
          this._Router.navigate(['/mangePlayer']) 
        }else if(type == "agentsOfMinistry"){
          this._Router.navigate(['/allAssos'])
        }else if(type == "player"){
          this._Router.navigate(['/playerHome']) 
        }
        
      },
      error:(err)=>{
        this.isLoading=false; 
          this.errMessage=err.error.data;
      }
    })
   }
    
  }
  viewPass():void{
    this.visible=!this.visible
    this.changeType=!this.changeType
  }
}