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

  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
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
