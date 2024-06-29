import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router= inject(Router)
  let token =localStorage.getItem('_token')
  let userType =localStorage.getItem('_type')
  if (token && userType=='admin') {
    router.navigateByUrl("/Adminhome")
    return false
  }
  else if (token && userType=='representorOfAssociation') {
    router.navigateByUrl("/rephome")
    return false
  }
  else if (token && userType=='agentsOfMinistry') {
    router.navigateByUrl("/playersInAssos")
    return false
  }
  else if (token && userType=='player') {
    router.navigateByUrl("/playerHome")
    return false
  }
  return true;

};
