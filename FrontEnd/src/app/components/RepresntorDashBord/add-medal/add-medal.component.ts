import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RepresntorService } from 'src/app/core/services/represntor.service';
@Component({
  selector: 'app-add-medal',
  templateUrl: './add-medal.component.html',
  styleUrls: ['./add-medal.component.scss']
})
export class AddMedalComponent {
  constructor(private _RepresntorService: RepresntorService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    private _ActivatedRoute:ActivatedRoute) { }
  errMessage: string = '';
  selectedChampionshipInfo: string = "";

  isLoading: boolean = false;
  nameArray: any = [];
  playerId:any
  addMedal: FormGroup = new FormGroup({
    MedalAchievementDate: new FormControl('', [Validators.required]),
    typeOfMedal: new FormControl(''),
    year: new FormControl('', [Validators.required]),
    isWin: new FormControl(''),
    championshipID:new FormControl('', [Validators.required]),
  })
  ngOnInit(): void {
    this._RepresntorService.getAllChampionships().subscribe({
      next:(res)=>{
        let data =res.data
        
        for (let i = 0; i < data.length; i++) {
          this.nameArray.push(data[i])   
        }
        console.log( this.nameArray);
       }
    })
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.playerId = params.get('playerId');
      }
    })
  }
  handelForm() {
    const userData = {playerId:this.playerId,...this.addMedal.value};
    this.isLoading = true
    if (this.addMedal.valid) {
      this._RepresntorService.addMedal(userData).subscribe({
        next: () => {
          this.isLoading = false;
          this._Router.navigate([`/playerDetails/${this.playerId}`])

          this._ToastrService.success('The Medal has been added successfully');
          this.errMessage = ''

        }, error: (err) => {
          this.isLoading = false;
          
          this.errMessage = err.error.message

        }
      })
    }
  }
  
  
}
