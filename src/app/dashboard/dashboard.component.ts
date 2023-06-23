import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  role!:string;
  constructor(private loginService:LoginService){
    this.role =String(localStorage.getItem("role"));
  }


}
