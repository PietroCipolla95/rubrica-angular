import { HttpClient, } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { UsersService } from '../users.service';

interface DeleteResponse {
  success: boolean;
  user: {};
}

interface messageResponse {
  success: boolean;
  message: ''
}

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrl: './users-view.component.scss'
})
export class UsersViewComponent implements OnInit {

  constructor(private http: HttpClient, private usr: UsersService) { }

  users: any = [];
  user: any = {};
  permissions: any = [];
  selectedPermissions: string[] = [];
  newUser: any = {
    name: '',
    password: '',
    type: '',
    permissions: [] as string[]
  };
  deletedUser: any = {};
  message: any = '';


  ngOnInit(): void {
    this.getUsers()
    this.getPermissions()
    console.log(this.deletedUser);
  }

  // Method to toggle permission selection
  togglePermission(permission: string) {
    const index = this.selectedPermissions.indexOf(permission);
    if (index !== -1) {
      // If permission is already selected, remove it from selectedPermissions
      this.selectedPermissions.splice(index, 1);
    } else {
      // If permission is not selected, add it to selectedPermissions
      this.selectedPermissions.push(permission);
    }
    console.log(this.selectedPermissions);
  }

  getPermissions() {
    this.http.get('http://127.0.0.1:8000/api/permissions')
      .subscribe((data: any) => {

        const permissionsArray = data.permissions
        console.log(permissionsArray);

        this.permissions = permissionsArray.map((permission: any) => permission.name)

        console.log('permissions', this.permissions);
      })
  }

  getUsers() {
    this.usr.fetchUsers().subscribe(
      (data: any) => {
        this.users = data.users;
        console.log('Users:', this.users);
      });
  }

  //create a new user
  addUser() {
    this.newUser.permissions = this.selectedPermissions;
    console.log(this.newUser);
    this.http.post<messageResponse>('http://127.0.0.1:8000/api/user', this.newUser)
      .subscribe((message: messageResponse) => {
        //refresh the list as new users are added
        console.log(this.newUser);
        this.message = message.message
        console.log(this.message);
        this.getUsers()
      })

    this.newUser = {}
    this.selectedPermissions = []
  }

  //delete user
  deleteUser(id: number) {

    //get the user before deleting
    this.http.get<DeleteResponse>('http://127.0.0.1:8000/api/user/' + id)
      .subscribe((deleted: DeleteResponse) => {
        this.deletedUser = deleted.user
        console.log(this.deletedUser);
        //now delete user
        this.http.delete('http://127.0.0.1:8000/api/user/' + id)
          .subscribe((response) => {
            this.getUsers()
          })
      })

    this.deletedUser = {}

  }

}
