import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {  Router } from '@angular/router';
import { PlayerService } from 'src/app/core/services/player.service';
@Component({
  selector: 'app-req-to-edit-info',
  templateUrl: './req-to-edit-info.component.html',
  styleUrl: './req-to-edit-info.component.scss'
})
export class ReqToEditInfoComponent {
  constructor(private _PlayerService:PlayerService,
    private _ToastrService: ToastrService,
    private _Router:Router,){}  
    model = {
      playerName: '',
      birthOfDate: '',
      height: '',
      weight: '',
      club: '',
    }
    errMessage: string = '';
    isLoading: boolean = false;

    editInfo: FormGroup = new FormGroup({
      playerName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+(([' -][A-Za-z])?[A-Za-z]*)*$/)]),
      birthOfDate: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      club: new FormControl('', ),
      description: new FormControl('', [Validators.required]),
    });
    ngOnInit(): void {
      
          this._PlayerService.getSinglePlayerdata().subscribe({
            next:(res)=>{
            this.model.playerName=res.data[0].name;
              this.model.birthOfDate=res.data[0].birthOfDate;
              this.model.height=res.data[0].height;
              this.model.weight=res.data[0].weight;
              this.model.club=res.data[0].club;
              const originalDateString = this.model.birthOfDate;
const originalDate = new Date(originalDateString);

const formattedDate = originalDate.toISOString().split('T')[0];
 this .model.birthOfDate =formattedDate
            }
          })
        
  
    }

    handelForm() {
      const userData = this.editInfo.value;
      console.log(userData);
      
      this.isLoading = true;
      if (this.editInfo.valid) {  
          this.isLoading=true
          this._PlayerService.reqToEditInfo(userData).subscribe({
            next:(res)=>{
              console.log(res);
              this.isLoading=false; 
              this._Router.navigate(['/playerHome'])
              this._ToastrService.success('The request has been sended successfully');
              
            },error:(err)=>{
              console.log(err);
              this.isLoading=false; 
              this.errMessage = err.error.data
            }
      
          })
          


        }
      }
    
  
}
