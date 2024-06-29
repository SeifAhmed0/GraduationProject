import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RepresntorService } from 'src/app/core/services/represntor.service';
import { PlayerService } from 'src/app/core/services/player.service';
@Component({
  selector: 'app-req-to-add-medal',
  templateUrl: './req-to-add-medal.component.html',
  styleUrl: './req-to-add-medal.component.scss'
})
export class ReqToAddMedalComponent {
  constructor(private _RepresntorService: RepresntorService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    private _ActivatedRoute:ActivatedRoute,
     private _PlayerService:PlayerService) { }
  errMessage: string = '';
  isLoading: boolean = false;
  nameArray: any = [];
  playerId:any
  addMedal: FormGroup = new FormGroup({
    MedalAchievementDate: new FormControl('', [Validators.required]),
    typeOfMedal: new FormControl(''),
    year: new FormControl('', [Validators.required]),
    isWin: new FormControl(''),
    championshipID:new FormControl('', [Validators.required]),
    description:new FormControl('', [Validators.required]),
  })
  ngOnInit(): void {
    this._PlayerService.getAllChampionships().subscribe({
      next:(res)=>{
        let data =res.data
        console.log(res);
        
        
        for (let i = 0; i < data.length; i++) {
          this.nameArray.push(data[i])
          // this.nameArray.push(data[i].id+"-"+data[i].name +"-"+ data[i].typeOfChampionship +"-"+data[i].gender)
          
        }
        console.log( this.nameArray);
        
      }
    })
  }

  handelForm() {
    this.isLoading = true
    if (this.addMedal.valid) {
      this._PlayerService.reqToAddMedal(this.addMedal.value).subscribe({
        next: (res) => {
          console.log(res);
          
          this.isLoading = false;
          this._Router.navigate(['/playerHome'])
          this._ToastrService.success('The request has been sended successfully');
          this.errMessage = ''

        }, error: (err) => {
          this.isLoading = false;
          this.errMessage = err.error.message

        }
      })
    }
  }
}
