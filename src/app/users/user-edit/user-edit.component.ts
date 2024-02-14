import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UsersService } from '../users.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent {

  constructor(private route: ActivatedRoute, private usr: UsersService, private http: HttpClient) { }

  user: any = {}
  id: any = ''
  message: any = ''


  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.id = param.get('id')

      if (this.id) {
        this.usr.getUserById(this.id).subscribe(user => this.user = user)
        console.log(this.id, 'id');
      }
    })

    this.fetchUserDetails()
  }

  fetchUserDetails() {
    this.http.get('http://localhost:8000/api/user/' + this.id)
      .subscribe((data: any) => {
        this.user = data.user
        console.log(this.user, 'user');
      });
  }

  updateUser() {
    this.http.patch('http://localhost:8000/api/user/' + this.id, this.user)
      .subscribe((data: any) => {
        console.log(this.user);

        this.message = data.message
        console.log(this.message);
      })
  }

}
