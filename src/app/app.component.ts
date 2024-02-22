import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rubrica-new';

  constructor(private auth: AuthService) { }

  logout() {
    this.auth.logout()
  }

  isLogged() {
    const loggedIn = this.auth.isAuthenticated()
    return loggedIn
  }

  checkPermission(permission: string): Boolean {
    return this.auth.hasPermission(permission)
  }

}
