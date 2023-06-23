import { Component } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  userId:any = localStorage.getItem("userId");
  user:any;
  constructor(private userService: UserService){
    this.userService.getUser(this.userId).subscribe(
      (res)=>{
        this.user = res;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
