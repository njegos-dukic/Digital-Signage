import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => this.users = users,
      error: (e) => console.log(e)
    });
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

  toggleStatus(user: User) {
    this.userService.toggleStatus(user).subscribe({
      next: () => user.deleted = !user.deleted,
      error: (e) => console.log(e)
    });
  }

  resetPassword(user: User) {
    this.userService.resetPassword(user).subscribe({
      next: () => alert("Password for user " + user.username + " has been reset."),
      error: (e) => console.log(e)
    });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe({
      next: () => alert("User " + user.username + " has been deleted."),
      error: (e) => console.log(e)
    });
  }
}
