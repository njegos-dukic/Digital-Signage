import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor (private loginService: LoginService, private router: Router) { }

  canActivate(): boolean {
    if (localStorage.getItem("user"))
      return true;
    else {
      console.log("CANT NAVIGATE GOES BRRRRRRRRRRRRRRRRRR")
      this.router.navigate(['login']);
    }

    return false;
  }
}
