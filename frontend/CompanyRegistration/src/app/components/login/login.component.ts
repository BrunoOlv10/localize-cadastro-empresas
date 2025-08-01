import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [HeaderComponent, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) {
      this.loginForm = this.fb.group({
        email: [''],
        senha: ['']
      });
    }

    ngOnInit(): void {
      const token = sessionStorage.getItem('token');

      if (token) {
        this.router.navigate(['/home']);
      }
    }

    errorMessage = '';
    isLoading = false;

    onSubmit(): void {
      this.errorMessage = '';
      this.isLoading = true;

      const { email, senha } = this.loginForm.value;

      this.authService.login({ email, senha }).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/home'])
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error;
        }
      });
    }
}