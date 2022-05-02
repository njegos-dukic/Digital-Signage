import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillboardsComponent } from './components/billboards/billboards.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  { 
    path: 'login', 
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'billboards',
    component: BillboardsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'messages',
    component: FeedbackComponent,
    canActivate: [AuthGuard]
  },
  // TODO: Us two.
  {
    path: 'content',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'logout',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "**", 
    redirectTo: "dashboard"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
