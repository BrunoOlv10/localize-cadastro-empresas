import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [HeaderComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    constructor(private router: Router) {} 

    onLogin(): void {
      this.router.navigate(['/home'])
    }
}