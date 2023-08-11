import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);
   if(authService.isAdmin()){
      return true;
   }
   else{
      router.navigate(["login"]);
   }

  return false;
};
