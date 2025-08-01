import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    constructor(private router: Router) {} 

    logout(): void {
      sessionStorage.removeItem('token');
      this.router.navigate(['/'])
    }
}
