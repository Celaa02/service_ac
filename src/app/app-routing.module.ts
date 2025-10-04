import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './features/auth/login-page.component';
import { AccountsListComponent } from './features/accounts/accounts-list.component';
import { AccountDetailComponent } from './features/accounts/account-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'accounts', component: AccountsListComponent },
  { path: 'accounts/:id', component: AccountDetailComponent },
  { path: '', pathMatch: 'full', redirectTo: 'accounts' },
  { path: '**', redirectTo: 'accounts' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
