import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  url = "http://localhost:8080/api/v1/users";
  constructor(private http:HttpClient) {

   }
   private handleError(error: HttpErrorResponse) {
   
    return throwError(() => error);
  }
   doLogin(user:User){
    localStorage.removeItem("token")
    return this.http.post(`${this.url}/login`,user).pipe(catchError(this.handleError));
   }

   
  loginUser(token:string, role:string, refreshToken:string, userId:any){
    localStorage.setItem("token",token);
    localStorage.setItem("role",role);
    localStorage.setItem("refreshToken",refreshToken)
    localStorage.setItem("userId",userId)
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
    window.location.href="/login"
    return true;
  }

  getToken(){
    return localStorage.getItem("token");
  }


  getRefToken(){
    let token = String(localStorage.getItem("refreshToken"));
    localStorage.removeItem("token");
    let result:any = this.http.post("http://localhost:8080/api/v1/users/refresh",token);
    return result;
  
  }
}
