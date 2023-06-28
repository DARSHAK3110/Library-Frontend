import { CanActivateFn } from '@angular/router';
import { LoginService } from '../service/login.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router'
export const loginPageGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);
  if(!authService.isLoggedIn()){
    return true;
 }
 else{
    router.navigate([""]);
    window.history.back
 }

return false;
};
