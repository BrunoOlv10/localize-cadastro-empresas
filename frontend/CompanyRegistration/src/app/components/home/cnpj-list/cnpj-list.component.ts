import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CnpjService } from '../../../services/cnpj.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cnpj-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cnpj-list.component.html',
  styleUrl: './cnpj-list.component.scss'
})
export class CnpjListComponent {
    companies: any[] = [];
    currentPage = 1;
    totalPages = 1;
    totalResults = 0;
    errorMessage = '';
    isLoading = false;

    pageSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    orderFields = [
        { label: 'Nome Empresarial', value: 'NomeEmpresarial' },
        { label: 'Nome Fantasia', value: 'NomeFantasia' },
        { label: 'CNPJ', value: 'Cnpj' },
        { label: 'Abertura', value: 'Abertura' },
        { label: 'Natureza Jurídica', value: 'NaturezaJuridica' },
        { label: 'Atividade', value: 'AtividadePrincipal' },
        { label: 'Município', value: 'Municipio' },
        { label: 'UF', value: 'Uf' }
    ];

    filterForm: FormGroup;

    constructor(private cnpjService: CnpjService, private fb: FormBuilder) {
        this.filterForm = this.fb.group({
        pageSize: [10],
        sortBy: ['NomeEmpresarial'],
        sortDirection: ['asc']
        });
    }

    ngOnInit() {
        this.loadCompanies();

        this.cnpjService.cnpjAdded$.subscribe(() => {
            this.loadCompanies(); 
        });
    }

    loadCompanies() {
        this.errorMessage = '';
        this.isLoading = true;
        this.companies = [];

        const { pageSize, sortBy, sortDirection } = this.filterForm.value;

        const params = {
            page: this.currentPage,
            pageSize: pageSize,
            sortBy: sortBy,
            sortDirection: sortDirection
        };

        this.cnpjService.getCnpjs(params).subscribe({
            next: (res) => {
                this.totalResults = res.totalResults;
                this.totalPages = res.totalPages;
                this.currentPage = res.page;
                this.companies = res.data;
                this.isLoading = false;
            },
            error: (err) => {
                if (err.status === 401) {
                    sessionStorage.removeItem('token');
                    window.location.href = '/';
                    return;
                }

                this.errorMessage = err.error;
                this.isLoading = false;

                setTimeout(() => {
                    this.errorMessage = '';
                }, 10000);
            }
        });
    }

    onFiltersChange() {
        this.currentPage = 1;
        this.loadCompanies();
    }

    goToPage(page: number) {
        if (page < 1 || page > this.totalPages) return;
        
        this.currentPage = page;
        this.loadCompanies();
    }
}
