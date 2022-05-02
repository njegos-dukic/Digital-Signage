import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto } from '../interfaces/loginDto';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(user: LoginDto): Observable<User> {
    let url = "https://localhost:9000/api/v1/admin-login"
    return this.httpClient.post<User>(url, user);
  }
}
