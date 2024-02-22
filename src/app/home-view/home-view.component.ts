import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.scss'
})
export class HomeViewComponent {

  auth = inject(AuthService)

  ngOnInit(): void {
    this.auth.getUser()
  }

}
