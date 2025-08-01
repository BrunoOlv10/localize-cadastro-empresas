import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [HeaderComponent, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
    registerForm: FormGroup;
    errorMessage = '';
    successMessage = '';
    isLoading = false;

    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) {
      this.registerForm = this.fb.group({
        nome: [''],
        email: [''],
        senha: ['']
      });
    }

    onSubmit(): void {
      this.errorMessage = '';
      this.successMessage = '';
      this.isLoading = true;

      const { nome, email, senha } = this.registerForm.value;

      this.authService.register({ nome, email, senha }).subscribe({
        next: (res) => {
          this.isLoading = false;

          if (res.message) {
            this.successMessage = res.message;

            setTimeout(() => {
              this.router.navigate(['/']);
            }, 5000);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          this.isLoading = false;

          if (typeof err.error === 'string') {
            this.errorMessage = err.error;
            return;
          }

          if (err.error.errors) {
            const validationErrors = Object.values(err.error.errors)
              .flat()
              .join(' ');
            this.errorMessage = validationErrors;
            return;
          }
        }
      });
    }
}
