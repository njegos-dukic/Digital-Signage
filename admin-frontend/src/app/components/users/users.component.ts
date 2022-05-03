import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { NewUser } from 'src/app/interfaces/newUser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  newUser: NewUser = { username: "", email: "", password: "" };
  currentlyEditedUser!: User;
  users: User[] = [];
  
  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem("color"))
      this.updateTheme(JSON.parse(localStorage.getItem("color") || ''));
      
    this.userService.getUsers().subscribe({
      next: (users) => this.users = users,
      error: () => this.toastr.error("Error gettings users from the database.", 'Error')
    });

    let newUserModal: any = document.getElementById("newUserModal");
    let editUserModal: any = document.getElementById("editUserModal");
    window.onclick = function(event) {
      if (event.target == newUserModal) {
        newUserModal.style.display = "none";
      }

      if (event.target == editUserModal) {
        editUserModal.style.display = "none";
      }
    }
  }

  showSidebar() {
    let navigationElement: any = document.querySelector('.navigation');
    let main: any = document.querySelector('.main');
    navigationElement.classList.toggle('active');
    main.classList.toggle('active');
  }

  updateTheme(color: string) {
    if(color == '')
      return;

    localStorage.setItem("color", JSON.stringify(color));
    let r: any = document.querySelector(':root');
    r.style.setProperty('--color-primary', color);
  }

  toggleStatus(user: User) {
    this.userService.toggleStatus(user).subscribe({
      next: () => { user.disabled = !user.disabled; this.toastr.success(user.username + "'s status is updated.", 'User updated'); },
      error: () => { this.toastr.error("Error while updating " + user.username + "'s status.", 'Error'); }
    });
  }

  toggleAdmin(user: User) {
    this.userService.toggleAdmin(user).subscribe({
      next: () => { user.isAdmin = !user.isAdmin; this.toastr.success(user.username + "'s admin status is updated.", 'User updated'); },
      error: () => { this.toastr.error("Error while updating " + user.username + "'s admin status.", 'Error'); }
    });
  }

  resetPassword(user: User) {
    this.userService.resetPassword(user).subscribe({
      next: () => this.toastr.success(user.username + "'s password is reset.", 'Password reset'),
      error: () => { this.toastr.error("Error while resetting " + user.username + "'s password.", 'Error'); }
    });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe({
      next: () => { this.toastr.success(user.username + "'s account is deleted.", 'Account deleted'); this.users = this.users.filter(u => u != user) },
      error: () => { this.toastr.error("Error while deleting " + user.username + "'s account.", 'Error'); }
    });
  }

  // Add User Modal
  showModal() {
    this.newUser = { username: "", email: "", password: "" };
    let modal: any = document.getElementById("newUserModal");
    modal.style.display = "block";
  }

  closeModal() {
    this.newUser = { username: "", email: "", password: "" };
    let modal: any = document.getElementById("newUserModal");
    modal.style.display = "none";
  }

  // Edit User Modal
  startEditingUser(user: User) {
    let modal: any = document.getElementById("editUserModal");
    this.currentlyEditedUser = { ...user };
    modal.style.display = "block";
  }

  closeEditModal() {
    let modal: any = document.getElementById("editUserModal");
    modal.style.display = "none";
  }

  updateUser(user: User) {
    this.userService.updateUser(user).subscribe({
      next: () => { this.closeEditModal(); this.ngOnInit(); this.toastr.success(user.username + "'s account is updated.", 'Account updated'); },
      error: (e) => { this.toastr.error(e.error, "Error while updating " + user.username + "'s account."); }
    });
  }

  addUser(user: NewUser) {
    this.userService.addUser(user).subscribe({
      next: () => { this.closeModal(); this.ngOnInit(); this.newUser = { username: "", email: "", password: "" }; this.toastr.success(user.username + "'s account is created.", 'Account created'); },
      error: (e) => { console.log(e); this.toastr.error(e.error, "Error while creating " + user.username + "'s account."); }
    });
  }
}