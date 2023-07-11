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
                let errorMsg = String(err.error.message);
                if(errorMsg.startsWith("JWT expired")){
                    return this.handleJwtexpiration(req,next);
                }
            
            return throwError(errorMsg);
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
                                      this.tokenRefreshed$.next(true);
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