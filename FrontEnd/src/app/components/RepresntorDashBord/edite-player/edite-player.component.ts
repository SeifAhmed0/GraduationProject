import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  } from 'src/app/core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RepresntorService } from 'src/app/core/services/represntor.service';

@Component({
  selector: 'app-edite-player',
  templateUrl: './edite-player.component.html',
  styleUrls: ['./edite-player.component.scss']
})
export class EditePlayerComponent {
  constructor(private _RepresntorService:RepresntorService,
    private _ToastrService: ToastrService,
    private _Router:Router,
    private _ActivatedRoute:ActivatedRoute,){}  
    model = {
      name: '',
      birthOfDate: '',
      gender: '',
      height: '',
      weight: '',
      club: '',
      img: '',
    }
    errMessage: string = '';
    playerId:any;
    isLoading: boolean = false;
    nameArray: any[] = [];
    editPlayer: FormGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+(([' -][A-Za-z])?[A-Za-z]*)*$/)]),
      birthOfDate: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      club: new FormControl(''),
      img: new FormControl('', [Validators.required]),
    }
   /*  , {validators:[this.validateImageSize] }as FormControlOptions */
    
    );
    ngOnInit(): void {
      console.log(this.model.name);
      
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          this.playerId = params.get('id');
          console.log(this.playerId);
          this._RepresntorService.getSinglePlayer(this.playerId).subscribe({
            next:(res)=>{
              this.model.name=res.data[0].name;
              this.model.birthOfDate=res.data[0].birthOfDate;
              this.model.gender=res.data[0].gender;
              this.model.height=res.data[0].height;
              this.model.weight=res.data[0].weight;
              this.model.club=res.data[0].club;
              this.model.img=res.data[0].img;
              const originalDateString = this.model.birthOfDate;
const originalDate = new Date(originalDateString);

const formattedDate = originalDate.toISOString().split('T')[0];
 this .model.birthOfDate =formattedDate
            }
          })
        }
      })
  
    }

    handelForm() {
      const userData = this.editPlayer.value;
      this.isLoading = true;
      if (this.editPlayer.valid) {
        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('birthOfDate', userData.birthOfDate);
        formData.append('gender', userData.gender);
        formData.append('height', userData.height);
        formData.append('weight', userData.weight);
        formData.append('club', userData.club);
  
        // Check if img control exists before setting its value
        const imgControl = this.editPlayer.get('img');
        if (imgControl) {
          const file = imgControl.value;
          formData.append('img', file);
  
          this.isLoading=true
          this._RepresntorService.updatePlayer(this.playerId,this.editPlayer.value).subscribe({
            next:()=>{
              this.isLoading=false; 
              this._Router.navigate(['/mangePlayer'])
              this._ToastrService.success('The player has been Updated successfully');
              
            },error:(err)=>{
              this.isLoading=false; 
              this.errMessage = err.error.data
            }
      
          })
          


        }
      }
    }
  
    onFileSelected(event: any) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.editPlayer.get('img')?.setValue(file);
      }
    }
}
