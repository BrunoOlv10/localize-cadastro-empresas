import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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

          if (err.error.errors) {
            const errorsObj = err.error.errors;
            const firstField = Object.keys(errorsObj)[0];

            if (firstField && errorsObj[firstField].length > 0) {
              this.errorMessage = errorsObj[firstField][0];
            } else {
              this.errorMessage = 'Erro de validação.';
            }

            return;
          }

          this.errorMessage = 'Erro inesperado ao registrar.';
        }
      });
    }
}
