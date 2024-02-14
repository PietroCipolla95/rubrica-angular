import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { __param } from 'tslib';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrl: './single-user.component.scss'
})
export class SingleUserComponent {

  constructor(private route: ActivatedRoute, private usr: UsersService) { }

  httpClient = inject(HttpClient);
  user: any = {};
  id: any = '';


  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.id = param.get('id')

      if (this.id) {
        this.usr.getUserById(this.id).subscribe(user => this.user = user)
        console.log(this.id);
      }
    })

    this.fetchUserDetails()
  }

  //fetch single user details
  fetchUserDetails() {
    this.httpClient.get('http://localhost:8000/api/user/' + this.id)
      .subscribe((data: any) => {
        this.user = data.user
        console.log(this.user);
      });
  }


}
