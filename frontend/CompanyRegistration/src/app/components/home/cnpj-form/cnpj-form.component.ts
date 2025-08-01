import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CnpjService } from '../../../services/cnpj.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cnpj-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cnpj-form.component.html',
  styleUrl: './cnpj-form.component.scss'
})
export class CnpjFormComponent {
    registerCnpjForm: FormGroup;
    successMessage = '';
    errorMessage = '';
    isLoading = false;

    constructor(
      private fb: FormBuilder,
      private cnpjService: CnpjService,
      private router: Router
    ) {
      this.registerCnpjForm = this.fb.group({
        cnpj: [''],
      });
    }

    onSubmit(): void {
      this.successMessage = '';
      this.errorMessage = '';
      this.isLoading = true;

      const { cnpj } = this.registerCnpjForm.value;

      this.cnpjService.addCnpj({ cnpj }).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.successMessage = res.message;

          this.cnpjService.notifyCnpjAdded();

          setTimeout(() => {
              this.successMessage = '';
          }, 5000);
        },
        error: (err) => {
          if (err.status === 401) {
              sessionStorage.removeItem('token');
              window.location.href = '/';
              return;
          }

          this.isLoading = false;
          this.errorMessage = err.error;
          
          setTimeout(() => {
              this.errorMessage = '';
          }, 10000);
        }
      })
    }
}
