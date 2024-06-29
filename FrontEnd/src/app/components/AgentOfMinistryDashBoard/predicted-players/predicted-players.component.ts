import { Component } from '@angular/core';
import { MinistryService } from 'src/app/core/services/ministry.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-predicted-players',
  templateUrl: './predicted-players.component.html',
  styleUrl: './predicted-players.component.scss'
})
export class PredictedPlayersComponent {
  perdiction: any[] = [];
  players: any[] = [];
  sendallPlayersInfo: any[] = [];
  lastFiveYearsPlayerInfo: any[] = [];
  playerAge: any;
  playerNames:any=[]
  goldMedalCounts:any[] =[]
  bronzeMedalCounts:any =[]
  sliverMedalCounts:any =[]
  numberOfChampions:any =[]
  goldMedalCountsAll:any[] =[]
  bronzeMedalCountsAll:any =[]
  sliverMedalCountsAll:any =[]
  numberOfChampionsAll:any =[]
  constructor(private _MinistryService: MinistryService) {}
  ngOnInit() {
    this._MinistryService.perdiction$.subscribe(data => {
      this.perdiction = data;
      this.perdiction.sort((a, b) => b.prediction - a.prediction)
    });
    this._MinistryService.players$.subscribe(data => {
      if (data) {
        this.players = data;
        const predictionMap = new Map(this.perdiction.map((item, index) => [item.id, index]));
        this.players = this.players.sort((a, b) => {
          return (predictionMap.get(a.id) ?? 0) - (predictionMap.get(b.id) ?? 0);
        }); 
      }
    });
    this._MinistryService.sendallPlayersInfo$.subscribe(data => {
      this.sendallPlayersInfo = data;
      let nameIndexMap = new Map();
      this.players.forEach((item, index) => {
    nameIndexMap.set(item.name, index);
});
this.sendallPlayersInfo.sort((a, b) => {
  let nameA = a[0].playerName;
  let nameB = b[0].playerName;
  return nameIndexMap.get(nameA) - nameIndexMap.get(nameB);
});
    });
    this._MinistryService.lastFiveYearsPlayerInfo$.subscribe(data => {
      this.lastFiveYearsPlayerInfo = data;
      let nameIndexMap = new Map();
      this.players.forEach((item, index) => {
    nameIndexMap.set(item.name, index);
});
this.lastFiveYearsPlayerInfo.sort((a, b) => {
  let nameA = a[0].playerName;
  let nameB = b[0].playerName;
  return nameIndexMap.get(nameA) - nameIndexMap.get(nameB);
});

    });
         /*⁡⁢⁢⁢******************************𝗘𝘅𝘁𝗿𝗮𝗰𝘁 player Age**************************************⁡ */
    for (let i = 0; i < this.players.length; i++) {
      const birthDate = new Date(this.players[i].birthOfDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.players[i].birthOfDate = age;
    }
         /*⁡⁢⁢⁢******************************𝗘𝘅𝘁𝗿𝗮𝗰𝘁 player Names**************************************⁡ */

    for (let i = 0; i < this.players.length; i++) {
      this.playerNames.push(this.players[i].name)
      
    }
         /*⁡⁢⁢⁢******************************𝗘𝘅𝘁𝗿𝗮𝗰𝘁 player Medals**************************************⁡ */
         for (const playerData of this.lastFiveYearsPlayerInfo) {
          for (const medal of playerData) {
              const playerName = medal.playerName;
              if (medal.typeOfMedal === "gold") {
                  if (!this.goldMedalCounts[playerName]) {
                      this.goldMedalCounts[playerName] = 0;
                  }
                  this.goldMedalCounts[playerName] += 1;
              } else if (medal.typeOfMedal=== "bronze") {
                  if (!this.bronzeMedalCounts[playerName]) {
                      this.bronzeMedalCounts[playerName] = 0;
                  }
                  this.bronzeMedalCounts[playerName] += 1;
              } else if (medal.typeOfMedal === "Silver") {
                  if (!this.sliverMedalCounts[playerName]) {
                      this.sliverMedalCounts[playerName] = 0;
                  }
                  this.sliverMedalCounts[playerName] += 1;
              }
          }
      }
this.goldMedalCounts = Object.values(this.goldMedalCounts);
this.bronzeMedalCounts = Object.values(this.bronzeMedalCounts);
this.sliverMedalCounts = Object.values(this.sliverMedalCounts);


         /*⁡⁢⁢⁢******************************𝗘𝘅𝘁𝗿𝗮𝗰𝘁 player champions**************************************⁡ */
         for (const playerData of this.lastFiveYearsPlayerInfo) {
          for (const medal of playerData) {
              const playerName = medal.playerName;
              if (medal.typeOfMedal!= "didnotWin") {
                  if (!this.numberOfChampions[playerName]) {
                      this.numberOfChampions[playerName] = 0;
                  }
                  this.numberOfChampions[playerName] += 1;
              }
          }
      }
      this.numberOfChampions= Object.values(this.numberOfChampions);
         /*⁡⁢⁢⁢******************************𝗘𝘅𝘁𝗿𝗮𝗰𝘁 player champions**************************************⁡ */

         const ctxP1 = document.getElementById('pieChart') as HTMLCanvasElement;
         new Chart(ctxP1, {
            type: 'pie',
            data: {
              labels:this.playerNames,
              datasets: [{
                label: 'Number Of Gold Medals',
                data:this.goldMedalCounts,
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
            }
          });
          const ctxP2 = document.getElementById('pieChart-2') as HTMLCanvasElement;
          new Chart(ctxP2, {
              type: 'pie',
              data: {
                  labels: this.playerNames,
                  datasets: [{
                      label: 'Number Of Bronze Medals',
                      data: this.bronzeMedalCounts,
                      backgroundColor: [
                          'rgba(255, 206, 86, 0.2)', // Yellow
                          'rgba(54, 162, 235, 0.2)', // Blue
                          'rgba(255, 99, 132, 0.2)',  // Red
                          'rgba(75, 192, 192, 0.2)',  // Teal
                          'rgba(153, 102, 255, 0.2)', // Purple
                          'rgba(255, 159, 64, 0.2)',  // Orange
                          'rgba(34, 139, 34, 0.2)',   // Green
                          'rgba(128, 0, 128, 0.2)',   // Purple
                          'rgba(220, 20, 60, 0.2)',   // Crimson
                          'rgba(0, 128, 0, 0.2)',     // Green
                          'rgba(255, 192, 203, 0.2)', // Pink
                          'rgba(0, 0, 128, 0.2)',     // Navy
                      ],
                      borderColor: [
                          'rgba(255, 206, 86, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 99, 132, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)',
                          'rgba(34, 139, 34, 1)',
                          'rgba(128, 0, 128, 1)',
                          'rgba(220, 20, 60, 1)',
                          'rgba(0, 128, 0, 1)',
                          'rgba(255, 192, 203, 1)',
                          'rgba(0, 0, 128, 1)',
                      ],
                      borderWidth: 1
                  }]
              }
          });
          
         const ctxP3 = document.getElementById('pieChart-3') as HTMLCanvasElement;
         new Chart(ctxP3, {
            type: 'pie',
            data: {
              labels:this.playerNames,
              datasets: [{
                label: 'Number Of Silver Medals',
                data:this.sliverMedalCounts,
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
            }
          });

          const ctx3=document.getElementById('barChart') as HTMLCanvasElement;
          new Chart(ctx3, {
            type: 'bar',
            data: {
              labels: this.playerNames,
              datasets: [{
                label: '',
                data: this.numberOfChampions,
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


          
/************************************************************************************************** */

for (const playerData of this.sendallPlayersInfo) {
  for (const medal of playerData) {
      const playerName = medal.playerName;
      if (medal.typeOfMedal === "gold") {
          if (!this.goldMedalCountsAll[playerName]) {
              this.goldMedalCountsAll[playerName] = 0;
          }
          this.goldMedalCountsAll[playerName] += 1;
      } else if (medal.typeOfMedal=== "bronze") {
          if (!this.bronzeMedalCountsAll[playerName]) {
              this.bronzeMedalCountsAll[playerName] = 0;
          }
          this.bronzeMedalCountsAll[playerName] += 1;
      } else if (medal.typeOfMedal === "Silver") {
          if (!this.sliverMedalCountsAll[playerName]) {
              this.sliverMedalCountsAll[playerName] = 0;
          }
          this.sliverMedalCountsAll[playerName] += 1;
      }
  }
}
this.goldMedalCountsAll = Object.values(this.goldMedalCountsAll);
this.bronzeMedalCountsAll = Object.values(this.bronzeMedalCountsAll);
this.sliverMedalCountsAll = Object.values(this.sliverMedalCountsAll);

console.log(this.goldMedalCountsAll);
console.log(this.bronzeMedalCountsAll);
console.log(this.sliverMedalCountsAll);

for (const playerData of this.sendallPlayersInfo) {
  for (const medal of playerData) {
      const playerName = medal.playerName;
      if (medal.typeOfMedal!= "didnotWin") {
          if (!this.numberOfChampionsAll[playerName]) {
              this.numberOfChampionsAll[playerName] = 0;
          }
          this.numberOfChampionsAll[playerName] += 1;
      }
  }
}
this.numberOfChampionsAll= Object.values(this.numberOfChampionsAll);
  
    
const ctxP4 = document.getElementById('pieChartAll') as HTMLCanvasElement;
new Chart(ctxP4, {
   type: 'pie',
   data: {
     labels:this.playerNames,
     datasets: [{
       label: 'Number Of Gold Medals',
       data:this.goldMedalCountsAll,
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
   }
 });
 const ctxP5 = document.getElementById('pieChart-2All') as HTMLCanvasElement;
 new Chart(ctxP5, {
     type: 'pie',
     data: {
         labels: this.playerNames,
         datasets: [{
             label: 'Number Of Bronze Medals',
             data: this.bronzeMedalCountsAll,
             backgroundColor: [
                 'rgba(255, 206, 86, 0.2)', // Yellow
                 'rgba(54, 162, 235, 0.2)', // Blue
                 'rgba(255, 99, 132, 0.2)',  // Red
                 'rgba(75, 192, 192, 0.2)',  // Teal
                 'rgba(153, 102, 255, 0.2)', // Purple
                 'rgba(255, 159, 64, 0.2)',  // Orange
                 'rgba(34, 139, 34, 0.2)',   // Green
                 'rgba(128, 0, 128, 0.2)',   // Purple
                 'rgba(220, 20, 60, 0.2)',   // Crimson
                 'rgba(0, 128, 0, 0.2)',     // Green
                 'rgba(255, 192, 203, 0.2)', // Pink
                 'rgba(0, 0, 128, 0.2)',     // Navy
             ],
             borderColor: [
                 'rgba(255, 206, 86, 1)',
                 'rgba(54, 162, 235, 1)',
                 'rgba(255, 99, 132, 1)',
                 'rgba(75, 192, 192, 1)',
                 'rgba(153, 102, 255, 1)',
                 'rgba(255, 159, 64, 1)',
                 'rgba(34, 139, 34, 1)',
                 'rgba(128, 0, 128, 1)',
                 'rgba(220, 20, 60, 1)',
                 'rgba(0, 128, 0, 1)',
                 'rgba(255, 192, 203, 1)',
                 'rgba(0, 0, 128, 1)',
             ],
             borderWidth: 1
         }]
     }
 });
 
const ctxP6 = document.getElementById('pieChart-3All') as HTMLCanvasElement;
new Chart(ctxP6, {
   type: 'pie',
   data: {
     labels:this.playerNames,
     datasets: [{
       label: 'Number Of Silver Medals',
       data:this.sliverMedalCountsAll,
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
   }
 });

 const ctx7=document.getElementById('barChartAll') as HTMLCanvasElement;
 new Chart(ctx7, {
   type: 'bar',
   data: {
     labels: this.playerNames,
     datasets: [{
       label: '',
       data: this.numberOfChampionsAll,
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
  }


  
}
