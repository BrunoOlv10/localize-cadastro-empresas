import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    constructor(private router: Router) {} 

    userName = 'Usuário';

    ngOnInit() {
      const name = this.getUserNameFromToken();
      
      if (name) {
        this.userName = name;
      }
    }

    getUserNameFromToken() {
      const token = sessionStorage.getItem('token');
      if (!token) return null; 

      const decoded = jwtDecode<{ nameid: string, unique_name: string; }>(token);
      return decoded.unique_name || null;
    }

    logout(): void {
      sessionStorage.removeItem('token');
      this.router.navigate(['/'])
    }
}
