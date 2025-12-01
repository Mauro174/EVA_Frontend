// admin-guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login-service';

export const adminGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const rawRole = loginService.showRole(); // 👈 tomamos el rol desde el token

  console.log('ROL EN GUARD:', rawRole); // revisa esto también

  if (!rawRole) {
    router.navigate(['/homes']);
    return false;
  }

  const role = String(rawRole).toUpperCase();

  // aceptamos ADMIN y ROLE_ADMIN
  const esAdmin = role === 'ADMIN' || role === 'ROLE_ADMIN';

  if (!esAdmin) {
    router.navigate(['/homes']);
    return false;
  }

  return true;
};
