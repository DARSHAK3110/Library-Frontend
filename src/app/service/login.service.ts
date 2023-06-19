import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = "http://localhost:8080/api/v1/users"
  constructor(private http:HttpClient) {

   }
   private handleError(error: HttpErrorResponse) {
   
    return throwError(() => error);
  }
   doLogin(user:User){
    return this.http.post(`${this.url}/login`,user).pipe(catchError(this.handleError));
   }

   
  loginUser(token:string){
    localStorage.setItem("token",token)
    return true;
  }

  isLoggedIn(){
    let token = localStorage.getItem("token");
    if(token == null || token == undefined ||token === '' ){
      return false;
    }
    return true;
  }

  logoutUser(){
    localStorage.removeItem("token");
    console.log(this.getToken());
    window.location.href="/login"
    return true;
  }

  getToken():string | null{
    return localStorage.getItem("token");
  }
}
