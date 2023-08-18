import { ChangeDetectorRef, Component } from '@angular/core';
import { LoginService } from '../service/login.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  role!:string;
<<<<<<< HEAD
  userType!:string;
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  adminNav = {"Users":"/admin","Book":"/admin/library/book","reservation":"/admin/library/reservation","borrowing":"/admin/library/borrowing","Author":"/admin/library/author","Location":"/admin/library/location","Floor":"/admin/library/floor", "Section":"/admin/library/section", "Shelf":"/admin/library/shelf"}
  userNav = {"Profile":"/user","Borrowing History":"/user/library/borrowing","Books":"/user/library/book","Reservation":"/user/library/reservation","Contact Us":"/user/library/contact","Cart":"/user/library/cart"}
  constructor(changeDetectorRef: ChangeDetectorRef,private loginService:LoginService, media: MediaMatcher) {
    this.role =String(localStorage.getItem("role"));
    this.userType = this.role.toLocaleLowerCase();
=======
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  adminNav = {"Users":"/dashboard","Floor":"/admin/library/floor", "Section":"/admin/library/section", "Shelf":"/admin/library/shelf"}
  userNav = ['hij','klm']
  constructor(changeDetectorRef: ChangeDetectorRef,private loginService:LoginService, media: MediaMatcher) {
    this.role =String(localStorage.getItem("role"));
 
>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  logout(){
    this.loginService.logoutUser();
  }
}
