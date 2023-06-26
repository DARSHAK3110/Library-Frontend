import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeleteUserModalComponent } from './modals/delete-user-modal/delete-user-modal.component';
import { AddEditUserModalComponent } from './modals/add-edit-user-modal/add-edit-user-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    PageNotFoundComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    DeleteUserModalComponent,
    AddEditUserModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatPaginatorModule,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
