import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RepresntorService } from 'src/app/core/services/represntor.service';
import { PlayerService } from 'src/app/core/services/player.service';
@Component({
  selector: 'app-req-to-edit-medal',
  templateUrl: './req-to-edit-medal.component.html',
  styleUrl: './req-to-edit-medal.component.scss'
})

export class ReqToEditMedalComponent {
  constructor(private _PlayerService: PlayerService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute) { }
  selectedChampionshipInfo: string = "";
  errMessage: string = '';
  isLoading: boolean = false;
  nameArray: any[] = [];
  playerId: any;
  medalId: any;
  model: any = {
    MedalAchievementDate: null,
    typeOfMedal: '',
    isWin: true,
    year: null,
    championshipID: null,
  }
  EditMedal: FormGroup = new FormGroup({
    MedalAchievementDate: new FormControl('', [Validators.required]),
    typeOfMedal: new FormControl(''),
    year: new FormControl('', [Validators.required]),
    isWin: new FormControl(''),
    championshipID: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        // this.playerId = params.get('playerId');
        this.medalId = params.get('medalId');
        console.log(this.medalId);
        
        this._PlayerService.getSingleMedal(this.medalId).subscribe({
          next: (res) => {
            this.model.MedalAchievementDate = res.data[0].MedalAchievementDate;
            this.model.typeOfMedal = res.data[0].typeOfMedal;
            this.model.isWin = res.data[0].isWin === 'yes'; // Convert to boolean
            this.model.year = res.data[0].year;
            this.model.championshipID = res.data[0].championshipID;
            const originalDateString = this.model.MedalAchievementDate;
            const originalDate = new Date(originalDateString);

            const formattedDate = originalDate.toISOString().split('T')[0];
             this.model.MedalAchievementDate =formattedDate
          }
        })
      }
    })
    this._PlayerService.getAllChampionships().subscribe({
      next: (res) => {
        let data = res.data

        for (let i = 0; i < data.length; i++) {
          this.nameArray.push(data[i])
          // this.nameArray.push(data[i].id+"-"+data[i].name +"-"+ data[i].typeOfChampionship +"-"+data[i].gender)

        }
        console.log(this.nameArray);

      }
    })

  }
  onChampionshipChange() {
    const selectedChampionship = this.nameArray.find(item => item.id === this.model.championshipID);
    if (selectedChampionship) {
      this.selectedChampionshipInfo = "Name: " + selectedChampionship.name + " Type of championship: " + selectedChampionship.typeOfChampionship + " Gender: " + selectedChampionship.gender;
    } else {
      this.selectedChampionshipInfo = ""; // Clear the selected championship info if no championship is selected
    }
    console.log(selectedChampionship);
  }



  handelForm() {
    this.isLoading = true
    if (this.EditMedal.valid) {
      this._PlayerService.reqToEditMedal(this.EditMedal.value,this.medalId).subscribe({
        next: () => {
          this.isLoading = false;
          this._Router.navigate([`/playerHome`])
          this._ToastrService.success('The request has been sended successfully');
          this.errMessage = ''

        }, error: (err) => {
          console.log(err);
          
          this.isLoading = false;
          this.errMessage = err.error.data

        }
      })
    }
  }
}
