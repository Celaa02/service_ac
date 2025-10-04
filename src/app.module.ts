import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';

import { LoginPageComponent } from './app/features/auth/login-page.component';
import { AccountsListComponent } from './app/features/accounts/accounts-list.component';
import { AccountDetailComponent } from './app/features/accounts/account-detail.component';
import { AuthInterceptor } from './app/core/interceptors/auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,

    AccountsListComponent,
    AccountDetailComponent,
    LoginPageComponent,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}

