import { CdkAccordionModule } from '@angular/cdk/accordion';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA,
  NgModule
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorComponent } from './components/admin/library/author/author.component';
import { BookInDetailedComponent } from './components/admin/library/book-in-detailed/book-in-detailed.component';
import { BookComponent } from './components/admin/library/book/book.component';
import { BorrowingComponent } from './components/admin/library/borrowing/borrowing.component';
import { FloorComponent } from './components/admin/library/floor/floor.component';
import { LocationComponent } from './components/admin/library/location/location.component';
import { ReservationComponent } from './components/admin/library/reservation/reservation.component';
import { SectionComponent } from './components/admin/library/section/section.component';
import { ShelfComponent } from './components/admin/library/shelf/shelf.component';
import { UnLocatedBookComponent } from './components/admin/library/un-located-book/un-located-book.component';
import { UploadComponent } from './components/admin/upload/upload.component';
import { UsersComponent } from './components/admin/users/users.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { ContactUsComponent } from './components/user/library/contact-us/contact-us.component';
import { UserBookComponent } from './components/user/library/user-book/user-book.component';
import { UserCartComponent } from './components/user/library/user-cart/user-cart.component';
import { UserReservationComponent } from './components/user/library/user-reservation/user-reservation.component';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { LoginComponent } from './login/login.component';
import { AcceptReservationModalComponent } from './modals/accept-reservation-modal/accept-reservation-modal.component';
import { AddBookReservationByUserModalComponent } from './modals/add-book-reservation-by-user-modal/add-book-reservation-by-user-modal.component';
import { AddBookToCartModalComponent } from './modals/add-book-to-cart-modal/add-book-to-cart-modal.component';
import { AddEditAuthorModalComponent } from './modals/add-edit-author-modal/add-edit-author-modal.component';
import { AddEditBookStatusModalComponent } from './modals/add-edit-book-status-modal/add-edit-book-status-modal.component';
import { AddEditBookComponent } from './modals/add-edit-book/add-edit-book.component';
import { AddEditFloorModalComponent } from './modals/add-edit-floor-modal/add-edit-floor-modal.component';
import { AddEditLocationModalComponent } from './modals/add-edit-location-modal/add-edit-location-modal.component';
import { AddEditSectionModalComponent } from './modals/add-edit-section-modal/add-edit-section-modal.component';
import { AddEditShelfComponent } from './modals/add-edit-shelf/add-edit-shelf.component';
import { AddEditUserModalComponent } from './modals/add-edit-user-modal/add-edit-user-modal.component';
import { AddReservationModalComponent } from './modals/add-reservation-modal/add-reservation-modal.component';
import { ChangeBookStatusModalComponent } from './modals/change-book-status-modal/change-book-status-modal.component';
import { ChechInModalComponent } from './modals/chech-in-modal/chech-in-modal.component';
import { ChechOutModalComponent } from './modals/chech-out-modal/chech-out-modal.component';
import { DeleteAuthorComponent } from './modals/delete-author/delete-author.component';
import { DeleteBookStatusModalComponent } from './modals/delete-book-status-modal/delete-book-status-modal.component';
import { DeleteLocationModalComponent } from './modals/delete-location-modal/delete-location-modal.component';
import { DeleteUserModalComponent } from './modals/delete-user-modal/delete-user-modal.component';
import { RejectReservationModalComponent } from './modals/reject-reservation-modal/reject-reservation-modal.component';
import { RemoveBookFromCartModalComponent } from './modals/remove-book-from-cart-modal/remove-book-from-cart-modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormatPipe } from './pipe/table/format.pipe';
import { LoginService } from './service/login.service';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserBorrowingComponent } from './components/user/library/user-borrowing/user-borrowing.component';
import { ExpirePipe } from './pipe/expire/expire.pipe';

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
    UserBorrowingComponent,
    ExpirePipe,

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
  providers: [LoginService,[{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor, multi:true},{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
