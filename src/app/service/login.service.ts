import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  url = "http://localhost:8090/api/v1/users";
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
    localStorage.setItem("refreshToken",refreshToken);
    localStorage.setItem("userId",userId);
    return true;
  }

  isLoggedIn(){
    let token = localStorage.getItem("token");
    console.log(token);
    
    if(token == null || token == undefined ||token === '' ){
      return false;
    }
    return true;
  }

  isAdmin(){
    let role = localStorage.getItem("role");
    if(role === "ADMIN"){
      return true;
    }
    else{
      return false;
    }
  }
  logoutUser(){
    this.localStorageCleaner();
     window.location.href="/login"
    return true;
  }

  getToken(){
    return localStorage.getItem("token");
  }


  getRefToken(){
    let token = String(localStorage.getItem("token"));
    console.log(token);
    
    let refreshToken = String(localStorage.getItem("refreshToken"));
    console.log(refreshToken);
    
   this.localStorageCleaner();
    let result:any = this.http.post(this.url+"/refresh",{"token":token,"refreshToken":refreshToken});
    return result;
  
  }
  localStorageCleaner(){
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("refreshToken");
  }
}
