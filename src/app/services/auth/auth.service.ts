import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsersService } from '../../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { this.loggedUserId = localStorage.getItem('loggedUserId') }

  usr = inject(UsersService);

  loggedUserId: any = ''

  apiUrl = 'http://127.0.0.1:8000/api/auth';
  error: any = ''
  loggedUser = {
    id: '',
    name: '',
    type: '',
  }
  permissions: string[] = []


  login(credentials: { name: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response) => {
          if (response && response.access_token) {
            this.loggedUser = {
              id: response.user.id,
              name: response.user.name,
              type: response.user.type,
            };

            this.loggedUserId = response.user.id
            //store logged user
            localStorage.setItem('loggedUser', JSON.stringify(this.loggedUser))
            // Store the token 
            localStorage.setItem('token', response.access_token);

            localStorage.setItem('loggedUserId', this.loggedUserId)

            this.router.navigate(['']);
          }
        })
      );
  }

  getUser() {
    this.http.get('http://localhost:8000/api/user/' + this.loggedUserId)
      .subscribe((data: any) => {
        this.permissions = data.permissions
        console.log(this.permissions);
      })
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('loggedUserId');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const loggedUserString = localStorage.getItem('loggedUser');

    if (loggedUserString) {
      const loggedUser = JSON.parse(loggedUserString);

      // Check if the user type is 'admin'
      return loggedUser.type === 'admin';
    }

    return false; // Return false if not admin
  }

  hasPermission(permission: string): boolean {
    const userPermissions = this.permissions
    return userPermissions.includes(permission);
  }

}
