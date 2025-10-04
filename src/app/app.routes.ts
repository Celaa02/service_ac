import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { AccountsListComponent } from './features/accounts/accounts-list.component';
import { AccountDetailComponent } from './features/accounts/account-detail.component';
import { LoginPageComponent } from './features/auth/login-page.component';
import { RegisterPageComponent } from './features/auth/register-page.component';
import { HomeComponent } from './features/home/home.component';
import { AccountCreateComponent } from './features/accounts/account-create.component';


export const authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.getToken()) {
    router.navigateByUrl('/login');
    return false;
  }
  return true;
};

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'accounts', component: AccountsListComponent, canActivate: [authGuard] },
  { path: 'accounts/create', component: AccountCreateComponent },
  { path: 'accounts/:id', component: AccountDetailComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'accounts' },
];

