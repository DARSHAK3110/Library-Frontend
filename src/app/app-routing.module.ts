import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { loginGuard } from './guard/login.guard';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { loginPageGuard } from './guard/login-page.guard';
const routes: Routes = [

  {
    path:"dashboard",
    component: DashboardComponent,
    pathMatch: "full",
    canActivate: [loginGuard]
  },
  {
    path:"login",
    component: LoginComponent,
    canActivate: [loginPageGuard],
    pathMatch:"full"
  },
  { path: "", 
    redirectTo: "/dashboard",
    pathMatch: "full" },
  { path: "**",
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
