import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
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
