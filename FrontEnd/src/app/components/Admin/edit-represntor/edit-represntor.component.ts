import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-represntor',
  templateUrl: './edit-represntor.component.html',
  styleUrls: ['./edit-represntor.component.scss']
})
export class EditRepresntorComponent {
  constructor(private _AdminService:AdminService,
    private _ToastrService: ToastrService,
    private _Router:Router,
    private _ActivatedRoute:ActivatedRoute,){}  
    isLoading:boolean=false;
      model = {
      name: '',
      email: '',
    }
  errMessage:string='';
  agentId:any;
  editRepresntor:FormGroup = new FormGroup({
    name:new FormControl('',[Validators.required ,Validators.pattern(/^[A-Za-z]+(([' -][A-Za-z])?[A-Za-z]*)*$/)]),
    email:new FormControl('',[Validators.required ,Validators.email]),
  })
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.agentId = params.get('id');
        console.log(this.agentId);
        this._AdminService.getSingleAgents(this.agentId).subscribe({
          next:(res)=>{
            this.model.name=res.data[0].name;
            this.model.email=res.data[0].email;

            
          }
        })
      }
    })

  }
  handelForm(){
    this.isLoading=true
    this._AdminService.updateAgent(this.agentId,this.editRepresntor.value).subscribe({
      next:()=>{
        this.isLoading=false; 
        this._Router.navigate(['/MangeRepresntor'])
        this._ToastrService.success('The account has been Updated successfully');
        
      },error:(err)=>{
        this.isLoading=false; 
        this.errMessage = err.error.data
      }

    })
    
  }
}
