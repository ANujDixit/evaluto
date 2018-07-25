import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserModule } from './user/user.module';
import { LoginComponent } from './login/login.component';
import { SimpleDialogComponent, UiService } from './common/ui.service';
import { MatSnackBarModule }  from '@angular/material/snack-bar';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { HttpHeaderInterceptor } from './core/services/http-header-interceptor';
import { HttpErrorInterceptor } from './core/services/http-error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    SimpleDialogComponent,
    SignUpComponent,
    NavigationMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdminModule,
    UserModule,
    MatSnackBarModule,
    CoreModule,
    SharedModule,
    AuthModule,   
  ],
  providers: [
    UiService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
