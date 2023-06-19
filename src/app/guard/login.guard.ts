import { CanActivateFn } from '@angular/router';
import { LoginService } from '../service/login.service';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {

  const authService = inject(LoginService);
  const router = inject(Router);
   if(authService.isLoggedIn()){
      return true;
   }
   else{
      router.navigate(["login"]);
   }

  return false;
};
