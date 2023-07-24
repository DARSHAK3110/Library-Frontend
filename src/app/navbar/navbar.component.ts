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
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  adminNav = {"Users":"/dashboard","Floor":"/admin/library/floor", "Section":"/admin/library/section", "Shelf":"/admin/library/shelf"}
  userNav = ['hij','klm']
  constructor(changeDetectorRef: ChangeDetectorRef,private loginService:LoginService, media: MediaMatcher) {
    this.role =String(localStorage.getItem("role"));
 
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
