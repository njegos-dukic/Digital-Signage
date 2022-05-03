import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UserId } from '../interfaces/userId';
import { NewUser } from '../interfaces/newUser';

@Injectable({
  providedIn: 'root'
})

// URL: https://localhost:9000/api/v1/users
export class UserService {

  private urlBase = 'https://localhost:9000/api/v1/users';

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.urlBase);
  }

  addUser(user: NewUser): Observable<User> {
    let url = "https://localhost:9000/api/v1/register"
    return this.httpClient.post<User>(url, user);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(this.urlBase, user);
  }

  toggleStatus(userId: UserId): Observable<void> {
    let url = this.urlBase + "/toggle"
    return this.httpClient.post<void>(url, userId);
  }

  toggleAdmin(userId: UserId): Observable<void> {
    let url = this.urlBase + "/toggle-admin"
    return this.httpClient.post<void>(url, userId);
  }

  resetPassword(userId: UserId): Observable<void> {
    let url = this.urlBase + "/reset"
    return this.httpClient.post<void>(url, userId);
  }

  deleteUser(userId: number): Observable<void> {
    let url = this.urlBase + "/" + userId;
    return this.httpClient.delete<void>(url);
  }
}
