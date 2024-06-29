import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import { DecimalFormatPipe } from 'src/app/core/pips/decimal-format.pipe';
import { MinistryService } from 'src/app/core/services/ministry.service';
@Component({
  selector: 'app-minplayer-details',
  standalone: true,
  imports: [DecimalFormatPipe],
  templateUrl: './minplayer-details.component.html',
  styleUrl: './minplayer-details.component.scss'
})
export class MinplayerDetailsComponent  {

  constructor( private _ActivatedRoute:ActivatedRoute , private _MinistryService:MinistryService){}
  playerId: any;
  AssosId: any;
  playerDetails:any={}
  allmedels:any={}
  playerAge: any

  numberOfGold:number=0
  numberOfBronze:number=0
  numberOfSliver:number=0

  ratioOflocalWin:number=0
  ratioOfLocalnotwin:number=0

  localWin:number=0

  ratioOfInternationalWin:number=0
  ratioOfInternationalnotWin:number=0

  International:number=0
  localnotWin:number=0
  InternationalnotWin:number=0
  InternationalWin:number=0

  allYears:any=[]
  numberOfYears:any=[]

  gold_W_local:number=0
  silver_W_local:number=0
  bronze_W_local:number=0
  gold_W_International:number=0
  silver_W_International:number=0
  bronze_W_International:number=0

  ratioOfGold:number=0
  ratioOfBronze:number=0
  ratioOfSliver:number=0
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.playerId = params.get('playerId');
        this.AssosId = params.get('AssosId');
       
      }
  })
  this._MinistryService.getPlayerDetails(this.playerId,this.AssosId).subscribe({
    next:(res)=>{
     this.playerDetails =res.data[0];
     this.allmedels =res.data;
     console.log(this.allmedels);
     /*⁡⁣⁢⁣**************************𝗘𝘅𝘁𝗿𝗮𝗰𝘁 𝗻𝘂𝗺𝗯𝗲𝗿 𝗼𝗳 𝗠𝗲𝗱𝗮𝗹********************************************⁡ */
    
     for (let i = 0; i < this.allmedels.length; i++) {
      
      if (this.allmedels[i].typeOfChampionship=="Local") {
        if (this.allmedels[i].isWin=="yes") {
          this.localWin++
        }
        else{
          this.localnotWin++
        }
       
      }else if(this.allmedels[i].typeOfChampionship=="International"){
        if (this.allmedels[i].isWin=="yes") {
          this.InternationalWin++
        }
        else{
          this.InternationalnotWin++
        }
      }
    }
     /*⁡⁢⁢⁢******************************𝗘𝘅𝘁𝗿𝗮𝗰𝘁 𝗶𝗳 𝗽𝗹𝗮𝘆𝗲𝗿 𝘄𝗶𝗻 𝗼𝗿 𝗻𝗼**************************************⁡ */

     for (let i = 0; i < this.allmedels.length; i++) {
      if (this.allmedels[i].typeOfMedal=="bronze") {
        this.numberOfBronze++
        if (this.allmedels[i].typeOfChampionship=="Local") {
          this.bronze_W_local++
        }else if(this.allmedels[i].typeOfChampionship=="International"){
          this.bronze_W_International++
        }
      }else if(this.allmedels[i].typeOfMedal=="gold"){
        this.numberOfGold++
        if (this.allmedels[i].typeOfChampionship=="Local") {
          this.gold_W_local++
        }else if(this.allmedels[i].typeOfChampionship=="International"){
          this.gold_W_International++
        }
      }else if(this.allmedels[i].typeOfMedal=="Silver"){
        this.numberOfSliver++
        if (this.allmedels[i].typeOfChampionship=="Local") {
          this.silver_W_local++
        }else if(this.allmedels[i].typeOfChampionship=="International"){
          this.silver_W_International++
        }
      }
    }
    
    this.ratioOflocalWin=(this.localWin/ (this.localWin+this.localnotWin))*100
    this.ratioOfLocalnotwin=(this.localnotWin/ (this.localWin+this.localnotWin))*100


    this.ratioOfInternationalWin=(this.InternationalWin/ (this.InternationalWin+this.InternationalnotWin))*100
    this.ratioOfInternationalnotWin=(this.InternationalnotWin/ (this.InternationalWin+this.InternationalnotWin))*100

    this.ratioOfGold=(this.numberOfGold/ (this.numberOfBronze+this.numberOfSliver+this.numberOfGold))*100
    this.ratioOfBronze=(this.numberOfBronze/ (this.numberOfBronze+this.numberOfSliver+this.numberOfGold))*100
    this.ratioOfSliver=(this.numberOfSliver/ (this.numberOfBronze+this.numberOfSliver+this.numberOfGold))*100
    /************************************************************************************************************* */
    const ctx2 =document.getElementById('barChart') as HTMLCanvasElement;
    new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: ['Gold & local', 'Silver & local', 'Bronz & local', 'Gold & International', 'Silver & International','Bronze & International'],
        datasets: [{
          label: '',
          data: [this.gold_W_local,this.silver_W_local,this.bronze_W_local,this.gold_W_International,this.silver_W_International,this.bronze_W_International],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(2, 182, 25, 0.2)',
            'rgba(115, 211, 20, 0.2)',
            'rgba(30, 12, 25, 0.2)',
            'rgba(88, 33, 22, 0.2)',
            'rgba(12, 25, 125, 0.2)',
            'rgba(111, 222, 190, 0.2)',
            'rgba(4, 220, 111, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(2, 182, 25, 1)',
            'rgba(115, 211, 20, 1)',
            'rgba(30, 12, 25, 1)',
            'rgba(88, 33, 22, 1)',
            'rgba(12, 25, 125, 1)',
            'rgba(111, 222, 190, 1)',
            'rgba(4, 220, 111, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    /********************************************************************************************************************* */
      const ctxP1 = document.getElementById('pieChart') as HTMLCanvasElement;
     new Chart(ctxP1, {
        type: 'pie',
        data: {
          labels: ['GOLD', 'OTHER'],
          datasets: [{
            label: 'Number Of Medals',
            data: [this.numberOfGold, this.numberOfBronze+this.numberOfSliver],
            backgroundColor: [
              'rgba(255, 206, 86, 0.5)',
              'rgba(30, 12, 25, 0.2)',

            ],
            borderColor: [
              'rgba(255, 206, 86, 1)',
              'rgba(30, 12, 25, 0.8)',
              
            ],
            borderWidth: 1
          }]
        }
      });
      /******************************************************************** */
    const ctxP2 = document.getElementById('pieChart-2') as HTMLCanvasElement;
     new Chart(ctxP2, {
        type: 'pie',
        data: {
          labels: [ 'BRONZE', 'OTHER'],
          datasets: [{
            label: 'Number Of Medals',
            data: [this.numberOfBronze, this.numberOfGold+ this.numberOfSliver],
            backgroundColor: [
              'rgba(205, 127, 50, 0.5)',
              'rgba(30, 12, 25, 0.2)',
            ],
            borderColor: [
              'rgba(205, 127, 50, 1)',
              'rgba(30, 12, 25, 0.8)',
              
            ],
            borderWidth: 1
          }]
        }
      });
      /******************************************************************** */
      const ctxP3 = document.getElementById('pieChart-3') as HTMLCanvasElement;
     new Chart(ctxP3, {
        type: 'pie',
        data: {
          labels: [ 'SILVER','OTHER'],
          datasets: [{
            label: 'Number Of Medals',
            data: [ this.numberOfSliver,this.numberOfGold+ this.numberOfBronze],
            backgroundColor: [
              'rgba(192, 192, 200, 0.5)',
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [

             'rgba(192, 192, 200, 1)',
             'rgba(255, 99, 132, 0.7)',
              
            ],
            borderWidth: 1
          }]
        }
      });
      /******************************************************************** */
    
    
     /*⁡⁢⁢⁡⁢⁣⁣*************************𝗘𝘅𝘁𝗿𝗮𝗰𝘁 𝗹𝗼𝗰𝗮𝗹 𝗼𝗿 𝗜𝗻𝘁𝗲𝗿𝗻𝗮𝘁𝗶𝗼𝗻𝗮𝗹 𝗼𝗿 𝗰𝗼𝗻𝘁𝗶𝗻𝗲𝗻𝘁𝗮𝗹****************************** ⁡*/

    /* ⁡⁢⁢⁣*************************𝗘𝘅𝘁𝗿𝗮𝗰𝘁 𝗔𝗹𝗹 𝗬𝗲𝗮𝗿𝘀 𝗢𝗳 𝗰𝗵𝗮𝗺𝗽𝗶𝗼𝗻𝗲𝘀*****************************⁡⁡ ⁡*/
         interface Championship {
          year: number;
          isWin: string; 
      }
      
      function getChampionshipData(data: Championship[]): number[][] {
          const yearsMap: { [year: number]: number } = {};
      
          data.forEach(championship => {
              const year = championship.year;
              if (year in yearsMap) {
                 
                  if (championship.isWin === "yes") {
                      yearsMap[year]++;
                  }
              } else {
                  yearsMap[year] = championship.isWin === "yes" ? 1 : 0;
              }
          });
      
          const championships: number[][] = [];
          for (const year in yearsMap) {
              championships.push([parseInt(year), yearsMap[parseInt(year)]]);
          }
      
          return championships;
      }
      let championshipData = getChampionshipData(this.allmedels);

  this.allYears = championshipData.map(row => row[0]); 
this.numberOfYears = championshipData.map(row => row[1]); 
this.allYears = this.allYears.map((num: number) => String(num));



console.log();
  
const ctx3 = document.getElementById('lineChart') as HTMLCanvasElement;
new Chart(ctx3, {
  type: 'line',
  data: {
    labels:  this.allYears,
    datasets: [{
      label: 'Championships Win',
      data: this.numberOfYears,
      fill: false,
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

     /*********************************************************************************************** */
     this.playerAge = res.data[0].birthOfDate
       const birthDate = new Date(this.playerAge);
       const today = new Date();
   
       let age = today.getFullYear() - birthDate.getFullYear();
       const monthDifference = today.getMonth() - birthDate.getMonth();
   
       if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
         age--;
       }
       this.playerAge =age;
      
    }
  })

}
}
