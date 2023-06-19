import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { loginGuard } from './guard/login.guard';
import { LoginComponent } from './login/login.component';
const routes: Routes = [

  {
    path:"",
    component: DashboardComponent,
    pathMatch: "full",
    canActivate: [loginGuard]
  },
  {
    path:"login",
    component: LoginComponent,
    pathMatch:"full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
