import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.scss'
})
export class LoginViewComponent {

  constructor(private http: HttpClient, private auth: AuthService) { }

  credentials = {
    name: '',
    password: ''
  };
  user: object = {};

  loginUser() {
    this.auth.login(this.credentials).subscribe(() => {
    });
  }

}
