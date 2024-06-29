import { Component } from '@angular/core';
import { MinistryService } from 'src/app/core/services/ministry.service';

@Component({
  selector: 'app-all-assos',
  templateUrl: './all-assos.component.html',
  styleUrls: ['./all-assos.component.scss']
})
export class AllAssosComponent {
  constructor(private _MinistryService:MinistryService){}
  allAgents:any={}


  ngOnInit(): void {
    this._MinistryService.getAllAgentsOfMinistry().subscribe({
      next:(res)=>{
        console.log(res);
        this.allAgents =res.data
      }
    })
      
    }
}
