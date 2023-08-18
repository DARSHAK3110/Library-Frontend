import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, concatMap, filter, finalize, take } from 'rxjs/operators';
import { BehaviorSubject, Observable, concat, mergeMap, retryWhen, throwError } from "rxjs";
import { LoginService } from "../service/login.service";

@Injectable()
export class AuthInterceptor  implements HttpInterceptor{
    isRefreshingToken = false;
    tokenRefreshed$ = new BehaviorSubject<boolean>(false);

    constructor(private loginService: LoginService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
         return next.handle(this.addToken(req)).pipe(
            catchError(err=>{
                
                if(err.status === 401){
                    return this.handleJwtexpiration(req,next);
                }
            if(err.error.message != null){
                return throwError(err.error.message);
            }
            else{
                let e = err.error.result;
                let error_msg = "";
                for (const key in e) {
                    error_msg = `${error_msg}`+"\n"+`${key}- ${e[key]}`
                }
                
                return throwError(error_msg );
            }
           
        })
         );
    }
    addToken(req: HttpRequest<any>): HttpRequest<any> {
        let token = localStorage.getItem("token");

        if (token === "" || token === null || token === undefined || token === "undefined") {
          
            return  req;
            
        }
        return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
      }
    
    private handleJwtexpiration(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
       //localStorage.removeItem("token")
      
        if(this.isRefreshingToken){
   
       
            return this.tokenRefreshed$.pipe(
                filter(Boolean),
                take(1),
                concatMap(()=> next.handle(this.addToken(req)))
            );
        }
        this.isRefreshingToken = true;

        this.tokenRefreshed$.next(false);
        
        return this.loginService.getRefToken().pipe(
           
            concatMap((res:any)=>{
                localStorage.setItem("token",res.token);
                localStorage.setItem("refreshToken",res.refreshToken);
                localStorage.setItem("role", res.role);
                localStorage.setItem("userId", res.userId);
<<<<<<< HEAD
=======
                console.log(res);
                
                                      this.tokenRefreshed$.next(true);
>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
                  return next.handle(this.addToken(req));
              }),
             
          catchError((err) => {
            this.loginService.logoutUser();
            return throwError(err);
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          })

        )
    
    }
}