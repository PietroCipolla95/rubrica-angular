import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  users: any = [];
  user: any = {};
  newUser: any = {
    name: '',
    password: '',
    type: ''
  };

  //fetch all users
  fetchUsers(): Observable<any[]> {
    return this.http.get<any[]>('http://127.0.0.1:8000/api/users');
  }

  //get id
  getUserById(id: number) {
    return of(this.users.find((user: any) => user.id === id));
  }

}
