import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeViewComponent } from './home-view/home-view.component';
import { LoginViewComponent } from './login/login-view/login-view.component';
import { UsersViewComponent } from './users/users-view/users-view.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { SingleUserComponent } from './users/single-user/single-user.component';
import { AnagraphicsViewComponent } from './anagraphics/anagraphics-view/anagraphics-view.component';
import { SingleAnagraphicComponent } from './anagraphics/single-anagraphic/single-anagraphic.component';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', component: HomeViewComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginViewComponent },
  { path: 'users', component: UsersViewComponent, canActivate: [authGuard, roleGuard], data: { adminOnly: true, allowTo: [['user_read'], ['user_write']] } },
  { path: 'users/:id', component: SingleUserComponent, canActivate: [authGuard, roleGuard], data: { adminOnly: true, allowTo: [['user_read'], ['user_write']] } },
  { path: 'users/edit/:id', component: UserEditComponent, canActivate: [authGuard, roleGuard], data: { adminOnly: true, allowTo: [['user_read'], ['user_write']] } },
  { path: 'anagraphics', component: AnagraphicsViewComponent, canActivate: [authGuard, roleGuard], data: { allowTo: [['anagraphics_read']] } },
  { path: 'anagraphics/:id', component: SingleAnagraphicComponent, canActivate: [authGuard, roleGuard], data: { allowTo: [['anagraphics_read'], ['anagraphics_write']] } },
  { path: '**', component: NotFoundComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
