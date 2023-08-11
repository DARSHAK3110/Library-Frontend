import { NgModule, CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginService } from './service/login.service';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatSelectModule} from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeleteUserModalComponent } from './modals/delete-user-modal/delete-user-modal.component';
import { AddEditUserModalComponent } from './modals/add-edit-user-modal/add-edit-user-modal.component';
import { UploadComponent } from './components/admin/upload/upload.component';
import { UsersComponent } from './components/admin/users/users.component';
import { FormatPipe } from './pipe/table/format.pipe';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FloorComponent } from './components/admin/library/floor/floor.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { AddEditFloorModalComponent } from './modals/add-edit-floor-modal/add-edit-floor-modal.component';
import { AddEditSectionModalComponent } from './modals/add-edit-section-modal/add-edit-section-modal.component';
import { SectionComponent } from './components/admin/library/section/section.component';
import { ShelfComponent } from './components/admin/library/shelf/shelf.component';
import { AddEditShelfComponent } from './modals/add-edit-shelf/add-edit-shelf.component';
import { LocationComponent } from './components/admin/library/location/location.component';
import { AddEditLocationModalComponent } from './modals/add-edit-location-modal/add-edit-location-modal.component';
import { AuthorComponent } from './components/admin/library/author/author.component';
import { AddEditAuthorModalComponent } from './modals/add-edit-author-modal/add-edit-author-modal.component';
import { BookComponent } from './components/admin/library/book/book.component';
import { AddEditBookComponent } from './modals/add-edit-book/add-edit-book.component';
import { BookInDetailedComponent } from './components/admin/library/book-in-detailed/book-in-detailed.component';
import { AddEditBookStatusModalComponent } from './modals/add-edit-book-status-modal/add-edit-book-status-modal.component';
import { AddReservationModalComponent } from './modals/add-reservation-modal/add-reservation-modal.component';
import { ChechInModalComponent } from './modals/chech-in-modal/chech-in-modal.component';
import { ChechOutModalComponent } from './modals/chech-out-modal/chech-out-modal.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { ReservationComponent } from './components/admin/library/reservation/reservation.component';
import { BorrowingComponent } from './components/admin/library/borrowing/borrowing.component';
import { DeleteAuthorComponent } from './modals/delete-author/delete-author.component';
import { DeleteLocationModalComponent } from './modals/delete-location-modal/delete-location-modal.component';
import { UnLocatedBookComponent } from './components/admin/library/un-located-book/un-located-book.component';
import { ChangeBookStatusModalComponent } from './modals/change-book-status-modal/change-book-status-modal.component';
import { DeleteBookStatusModalComponent } from './modals/delete-book-status-modal/delete-book-status-modal.component';
import { UserBookComponent } from './components/user/library/user-book/user-book.component';
import { AddBookToCartModalComponent } from './modals/add-book-to-cart-modal/add-book-to-cart-modal.component';
import { AddBookReservationByUserModalComponent } from './modals/add-book-reservation-by-user-modal/add-book-reservation-by-user-modal.component';
import { UserReservationComponent } from './components/user/library/user-reservation/user-reservation.component';
import { UserCartComponent } from './components/user/library/user-cart/user-cart.component';
import { RemoveBookFromCartModalComponent } from './modals/remove-book-from-cart-modal/remove-book-from-cart-modal.component';
import { ContactUsComponent } from './components/user/library/contact-us/contact-us.component';
import { AcceptReservationModalComponent } from './modals/accept-reservation-modal/accept-reservation-modal.component';
import { RejectReservationModalComponent } from './modals/reject-reservation-modal/reject-reservation-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    PageNotFoundComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    DeleteUserModalComponent,
    AddEditUserModalComponent,
    UploadComponent,
    UsersComponent,
    FormatPipe,
    FloorComponent,
    DashboardComponent,
    AddEditFloorModalComponent,
    AddEditSectionModalComponent,
    SectionComponent,
    ShelfComponent,
    AddEditShelfComponent,
    LocationComponent,
    AddEditLocationModalComponent,
    AuthorComponent,
    AddEditAuthorModalComponent,
    BookComponent,
    AddEditBookComponent,
    BookInDetailedComponent,
    AddEditBookStatusModalComponent,
    AddReservationModalComponent,
    ChechInModalComponent,
    ChechOutModalComponent,
    ReservationComponent,
    BorrowingComponent,
    DeleteAuthorComponent,
    DeleteLocationModalComponent,
    UnLocatedBookComponent,
    ChangeBookStatusModalComponent,
    DeleteBookStatusModalComponent,
    UserBookComponent,
    AddBookToCartModalComponent,
    AddBookReservationByUserModalComponent,
    UserReservationComponent,
    UserCartComponent,
    RemoveBookFromCartModalComponent,
    ContactUsComponent,
    AcceptReservationModalComponent,
    RejectReservationModalComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatTableModule,
    MatRadioModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatToolbarModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CdkAccordionModule,
    NgbModule
  ],
  providers: [LoginService,[{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor, multi:true}]],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
