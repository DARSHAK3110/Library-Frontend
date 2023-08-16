import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { inject } from '@angular/core';

export const userRoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);
   if(!authService.isAdmin()){
      
      console.log("admin");
      return true;
   }
   else{
      console.log("hello");
      
      router.navigate([""]);
   }

  return false;
};
