import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  apiUrl = 'http://127.0.0.1:8000/api/auth';
  error: any = ''
  loggedUser = {
    id: null,
    name: '',
    type: ''
  }


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
            //store logged user
            localStorage.setItem('loggedUser', JSON.stringify(this.loggedUser))
            // Store the token 
            localStorage.setItem('token', response.access_token);

            this.router.navigate(['']);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUser');
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

    return false; // Return false if no logged-in user is found
  }



}
