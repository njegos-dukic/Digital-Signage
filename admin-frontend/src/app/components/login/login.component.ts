import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginDto } from 'src/app/interfaces/loginDto';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private toastr: ToastrService, private router: Router) { }

  credentials: LoginDto = { username: "", password: "" };

  ngOnInit(): void {
    localStorage.clear();
  }

  showSidebar() {
    let navigationElement: any = document.querySelector('.navigation');
    let main: any = document.querySelector('.main');
    navigationElement.classList.toggle('active');
    main.classList.toggle('active');
  }

  updateTheme(color: string) {
    let r: any = document.querySelector(':root');
    r.style.setProperty('--color-primary', color);
  }

  login() {
    console.log(this.credentials);
    localStorage.clear();
    this.loginService.login(this.credentials).subscribe({
      next: (user) => { localStorage.setItem("user", JSON.stringify(user)); this.router.navigate(['dashboard']);  },
      error: (e) => this.toastr.error(e.error, "Error")
    });
  }
}
