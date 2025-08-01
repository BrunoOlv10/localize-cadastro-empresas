import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cnpj-list',
  imports: [CommonModule],
  templateUrl: './cnpj-list.component.html',
  styleUrl: './cnpj-list.component.scss'
})
export class CnpjListComponent {
    pageSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    orderFields = [
      'Nome Empresarial', 'Nome Fantasia', 'CNPJ', 'Abertura', 'Natureza Jurídica', 'Atividade', 'Município', 'UF'
    ];

    companies = [
      {
          NomeEmpresarial: 'Empresa A',
          NomeFantasia: 'Fantasia A',
          Cnpj: '00.000.000/0001-00',
          Abertura: '01/01/2000',
          NaturezaJuridica: 'LTDA',
          AtividadePrincipal: 'Comércio varejista',
          Municipio: 'São Paulo',
          Uf: 'SP'
      },
      {
          NomeEmpresarial: 'Empresa A',
          NomeFantasia: 'Fantasia A',
          Cnpj: '00.000.000/0001-00',
          Abertura: '01/01/2000',
          NaturezaJuridica: 'LTDA',
          AtividadePrincipal: 'Comércio varejista',
          Municipio: 'São Paulo',
          Uf: 'SP'
      },
      {
          NomeEmpresarial: 'Empresa A',
          NomeFantasia: 'Fantasia A',
          Cnpj: '00.000.000/0001-00',
          Abertura: '01/01/2000',
          NaturezaJuridica: 'LTDA',
          AtividadePrincipal: 'Comércio varejista',
          Municipio: 'São Paulo',
          Uf: 'SP'
      },
      {
          NomeEmpresarial: 'Empresa A',
          NomeFantasia: 'Fantasia A',
          Cnpj: '00.000.000/0001-00',
          Abertura: '01/01/2000',
          NaturezaJuridica: 'LTDA',
          AtividadePrincipal: 'Comércio varejista',
          Municipio: 'São Paulo',
          Uf: 'SP'
      },
      {
          NomeEmpresarial: 'Empresa A',
          NomeFantasia: 'Fantasia A',
          Cnpj: '00.000.000/0001-00',
          Abertura: '01/01/2000',
          NaturezaJuridica: 'LTDA',
          AtividadePrincipal: 'Comércio varejista',
          Municipio: 'São Paulo',
          Uf: 'SP'
      },
      {
          NomeEmpresarial: 'Empresa A',
          NomeFantasia: 'Fantasia A',
          Cnpj: '00.000.000/0001-00',
          Abertura: '01/01/2000',
          NaturezaJuridica: 'LTDA',
          AtividadePrincipal: 'Comércio varejista',
          Municipio: 'São Paulo',
          Uf: 'SP'
      },
      {
          NomeEmpresarial: 'Empresa A',
          NomeFantasia: 'Fantasia A',
          Cnpj: '00.000.000/0001-00',
          Abertura: '01/01/2000',
          NaturezaJuridica: 'LTDA',
          AtividadePrincipal: 'Comércio varejista',
          Municipio: 'São Paulo',
          Uf: 'SP'
      },
      {
          NomeEmpresarial: 'Empresa A',
          NomeFantasia: 'Fantasia A',
          Cnpj: '00.000.000/0001-00',
          Abertura: '01/01/2000',
          NaturezaJuridica: 'LTDA',
          AtividadePrincipal: 'Comércio varejista',
          Municipio: 'São Paulo',
          Uf: 'SP'
      },
      {
          NomeEmpresarial: 'Empresa A',
          NomeFantasia: 'Fantasia A',
          Cnpj: '00.000.000/0001-00',
          Abertura: '01/01/2000',
          NaturezaJuridica: 'LTDA',
          AtividadePrincipal: 'Comércio varejista',
          Municipio: 'São Paulo',
          Uf: 'SP'
      },
      {
          NomeEmpresarial: 'Empresa A',
          NomeFantasia: 'Fantasia A',
          Cnpj: '00.000.000/0001-00',
          Abertura: '01/01/2000',
          NaturezaJuridica: 'LTDA',
          AtividadePrincipal: 'Comércio varejista',
          Municipio: 'São Paulo',
          Uf: 'SP'
      },
      {
          NomeEmpresarial: 'Empresa A',
          NomeFantasia: 'Fantasia A',
          Cnpj: '00.000.000/0001-00',
          Abertura: '01/01/2000',
          NaturezaJuridica: 'LTDA',
          AtividadePrincipal: 'Comércio varejista',
          Municipio: 'São Paulo',
          Uf: 'SP'
      },
    ];
}
