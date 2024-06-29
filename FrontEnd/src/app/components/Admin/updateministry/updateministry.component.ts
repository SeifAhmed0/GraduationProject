import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-updateministry',
  templateUrl: './updateministry.component.html',
  styleUrls: ['./updateministry.component.scss']
})
export class UpdateministryComponent {
  constructor(private _AdminService:AdminService,
    private _ToastrService: ToastrService,
    private _Router:Router,
    private _ActivatedRoute:ActivatedRoute,){}
    model = {
      name: '',
      email: '',
    }
    isLoading:boolean=false;

  errMessage:string='';
  agentId:any;
  editAgentOfMinistry:FormGroup = new FormGroup({
    name:new FormControl('',[Validators.required ,Validators.pattern(/^[A-Za-z]+(([' -][A-Za-z])?[A-Za-z]*)*$/)]),
    email:new FormControl('',[Validators.required ,Validators.email]),
  })
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.agentId = params.get('id');
        console.log(this.agentId);
        this._AdminService.getSingleAgenOfMinistry(this.agentId).subscribe({
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
    this._AdminService.updateAgentOfMinistry(this.agentId,this.editAgentOfMinistry.value).subscribe({
      next:()=>{
        this.isLoading=false; 
        this._Router.navigate(['/mangeMinistry'])
        this._ToastrService.success('The account has been Updated successfully');
        
      },error:(err)=>{
        this.isLoading=false; 
        this.errMessage = err.error.data
      }

    })
    
  }
}
