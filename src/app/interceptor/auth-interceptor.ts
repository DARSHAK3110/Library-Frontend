import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "../service/login.service";

@Injectable()
export class AuthInterceptor  implements HttpInterceptor{
    constructor(private loginService: LoginService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.loginService.getToken();
        let newReq = req;
        if(token != null){
            newReq = req.clone({setHeaders:{Authorization:`Bearer ${token}`}});
        }
        return next.handle(newReq);
        throw new Error("Method not implemented.");
    }
}
