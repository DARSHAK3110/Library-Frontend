import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from './guard/login.guard';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { loginPageGuard } from './guard/login-page.guard';
import { FloorComponent } from './components/admin/library/floor/floor.component';
import { roleGuard } from './guard/role.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
<<<<<<< HEAD
import { UsersComponent } from './components/admin/users/users.component';
import { SectionComponent } from './components/admin/library/section/section.component';
import { ShelfComponent } from './components/admin/library/shelf/shelf.component';
import { LocationComponent } from './components/admin/library/location/location.component';
import { AuthorComponent } from './components/admin/library/author/author.component';
import { BookComponent } from './components/admin/library/book/book.component';
import { BookInDetailedComponent } from './components/admin/library/book-in-detailed/book-in-detailed.component';
import { ReservationComponent } from './components/admin/library/reservation/reservation.component';
import { BorrowingComponent } from './components/admin/library/borrowing/borrowing.component';
import { UnLocatedBookComponent } from './components/admin/library/un-located-book/un-located-book.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserBookComponent } from './components/user/library/user-book/user-book.component';
import { UserReservationComponent } from './components/user/library/user-reservation/user-reservation.component';
import { UserCartComponent } from './components/user/library/user-cart/user-cart.component';
import { ContactUsComponent } from './components/user/library/contact-us/contact-us.component';
import { userRoleGuard } from './guard/user-role.guard';
import { UserBorrowingComponent } from './components/user/library/user-borrowing/user-borrowing.component';
const routes: Routes = [
  {
    path: "admin",
    component: AdminDashboardComponent,
    canActivate: [loginGuard],
    children: [
      { path: "", component: UsersComponent, canActivate: [roleGuard] },
      { path: "library/floor", component: FloorComponent, canActivate: [roleGuard] },
      { path: "library/section", component: SectionComponent, canActivate: [roleGuard] },
      { path: "library/shelf", component: ShelfComponent, canActivate: [roleGuard] },
      { path: "library/location", component: LocationComponent, canActivate: [roleGuard] },
      { path: "library/author", component: AuthorComponent, canActivate: [roleGuard] },
      { path: "library/book", component: BookComponent, canActivate: [roleGuard] },
      { path: "library/book/:id", component: BookInDetailedComponent, canActivate: [roleGuard] },
      { path: "library/reservation", component: ReservationComponent, canActivate: [roleGuard] },
      { path: "library/borrowing", component: BorrowingComponent, canActivate: [roleGuard] },
      { path: "library/unlocated/:page/:id", component: UnLocatedBookComponent, canActivate: [roleGuard] }
    ]
  },
  {
    path: "user",
    component: AdminDashboardComponent,
    canActivate: [loginGuard],
    children: [
      { path: "", component: UserDashboardComponent, canActivate: [userRoleGuard] },
      { path: "library/book", component: UserBookComponent, canActivate: [userRoleGuard] },
      { path: "library/reservation", component: UserReservationComponent, canActivate: [userRoleGuard] },
      { path: "library/cart", component: UserCartComponent, canActivate: [userRoleGuard] },
      { path: "library/contact", component: ContactUsComponent, canActivate: [userRoleGuard] },
      { path: "library/borrowing", component: UserBorrowingComponent, canActivate: [userRoleGuard] }

=======
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
>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
    ]
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [loginPageGuard],
    pathMatch: "full"
  },
<<<<<<< HEAD
  {
    path: "",
    component: PageNotFoundComponent,
    pathMatch: "prefix"
  },
  {
    path: "**",
=======
  { path: "", 
    redirectTo: "/dashboard",
    pathMatch: "full" },
 
  
  { path: "**",
>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
