import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = () => {
  const router = inject(Router);

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  if (user.role !== 'USER') {
    router.navigate(['/login']);
    return false;
  }

  return true;
};