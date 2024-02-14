import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SingleUserComponent } from './users/single-user/single-user.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UsersViewComponent } from './users/users-view/users-view.component';
import { AnagraphicsViewComponent } from './anagraphics/anagraphics-view/anagraphics-view.component';
import { SingleAnagraphicComponent } from './anagraphics/single-anagraphic/single-anagraphic.component';
import { LoginViewComponent } from './login/login-view/login-view.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { tokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    NotFoundComponent,
    SingleUserComponent,
    UserEditComponent,
    UsersViewComponent,
    AnagraphicsViewComponent,
    SingleAnagraphicComponent,
    LoginViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(
      withInterceptorsFromDi(),
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useValue: tokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
