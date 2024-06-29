import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-player-navbar',
  templateUrl: './player-navbar.component.html',
  styleUrl: './player-navbar.component.scss'
})
export class PlayerNavbarComponent {
  constructor(private _Router:Router , private _AuthService:AuthService){}


  logout(){
    this._AuthService.logout().subscribe({
      next:()=>{
        localStorage.removeItem('_token')
        localStorage.removeItem('_type')
        this._Router.navigate(['/login'])
        
      }
      
    })
  }
}
