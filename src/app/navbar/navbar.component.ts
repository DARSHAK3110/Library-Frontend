import { ChangeDetectorRef, Component } from '@angular/core';
import { LoginService } from '../service/login.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  role!: string;
  userType!: string;
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  adminNav = { "Users": "/admin", "Book": "/admin/library/book", "Reservation": "/admin/library/reservation", "Borrowing": "/admin/library/borrowing", "Author": "/admin/library/author", "Location": "/admin/library/location", "Floor": "/admin/library/floor", "Section": "/admin/library/section", "Shelf": "/admin/library/shelf" }
  userNav = { "Profile": "/user", "Borrowing History": "/user/library/borrowing", "Books": "/user/library/book", "Reservation": "/user/library/reservation", "Contact Us": "/user/library/contact", "Favourite": "/user/library/favourite" }
  constructor(changeDetectorRef: ChangeDetectorRef, private loginService: LoginService, media: MediaMatcher) {
    this.role = String(localStorage.getItem("role"));
    this.userType = this.role.toLocaleLowerCase();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  logout() {
    this.loginService.logoutUser();
  }
}
