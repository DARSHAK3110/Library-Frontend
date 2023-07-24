import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from './guard/login.guard';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { loginPageGuard } from './guard/login-page.guard';
import { FloorComponent } from './components/admin/library/floor/floor.component';
import { roleGuard } from './guard/role.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { User } from './model/user';
import { UsersComponent } from './components/admin/users/users.component';
import { SectionComponent } from './components/admin/library/section/section.component';
import { ShelfComponent } from './components/admin/library/shelf/shelf.component';
const routes: Routes = [
 
  {
    path:"admin",
    component: AdminDashboardComponent,
    canActivate: [loginGuard],
    children: [
     {path:"", component: UsersComponent, canActivate: [roleGuard]},
     {path:"library/floor", component: FloorComponent, canActivate: [roleGuard]},
     {path:"library/section", component: SectionComponent, canActivate: [roleGuard]},
     {path:"library/shelf", component: ShelfComponent, canActivate: [roleGuard]}
    ]
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
