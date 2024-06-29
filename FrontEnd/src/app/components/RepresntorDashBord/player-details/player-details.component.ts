import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RepresntorService } from 'src/app/core/services/represntor.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss']
})
export class PlayerDetailsComponent {
  constructor(
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute, 
    private _RepresntorService: RepresntorService,
    private _ToastrService: ToastrService
  ) {}

  playerId: any;
  playerAge: any;
  playerDetails: any = {};
  laocalArray = new BehaviorSubject<any[]>([]);
  internationalArray = new BehaviorSubject<any[]>([]);

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.playerId = params.get('id');
        this.loadPlayerDetails();
      }
    });
  }

  loadPlayerDetails(): void {
    this._RepresntorService.getPlayerDetals(this.playerId).subscribe({
      next: (res) => {
        this.playerDetails = res.data[0];
        console.log(res.data);
        
        this.calculatePlayerAge(res.data[0].birthOfDate);
        this.updateMedals(res.data);
      }
    });
  }

  calculatePlayerAge(birthDateString: string): void {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    this.playerAge = age;
  }

  updateMedals(data: any[]): void {
    const localMedals = data.filter(medal => medal.typeOfChampionship === "Local");
    const internationalMedals = data.filter(medal => medal.typeOfChampionship === "International");
    
    this.laocalArray.next(localMedals);
    this.internationalArray.next(internationalMedals);
  }

  deleteMedal(id: any): void {
    this._RepresntorService.deleteMedal(id).subscribe({
      next: (res) => {
        this._ToastrService.success('The Medal has been Deleted successfully');
        this.refreshMedals();
        this._Router.navigate(['/playerDetails']);
      }
    });
  }

  refreshMedals(): void {
    this._RepresntorService.getPlayerDetals(this.playerId).subscribe({
      next: (res) => {
        this.updateMedals(res.data);
      }
    });
  }
}
