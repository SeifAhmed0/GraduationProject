import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const represntorGuard: CanActivateFn = (route, state) => {
  const router= inject(Router)
  let userType =localStorage.getItem('_type')
  if (userType!='representorOfAssociation') {
    router.navigateByUrl("/login")
    return false
  }
  return true;
};
