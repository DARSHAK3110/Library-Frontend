import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
url:string = String("http://localhost:8090/api/v1/users");
  constructor(private httpClient: HttpClient) {
   }

  getUsers(pageSize:number, setSize:number, searchFirst:string , searchLast:string , searchPhone:string ){
    return this.httpClient.get(this.url,{params:new HttpParams().set( "firstName",searchFirst).set("lastName", searchLast).set("phoneNumber",searchPhone).set("pageNumber",pageSize).set("setSize",setSize)}).pipe(catchError(this.handleError));
  }

  getUser(userId:number){
    return this.httpClient.get(`${this.url}/${userId}`).pipe(catchError(this.handleError));
  }

  deleteUser(userId:number){
    return this.httpClient.delete(`${this.url}/${userId}`).pipe(catchError(this.handleError));

  }

  
  updateUser(user:any,userId:number){
    return this.httpClient.put(`${this.url}/${userId}`,user).pipe(catchError(this.handleError));

  }

  addUser(userDto:any){
    return this.httpClient.post(this.url,userDto).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
