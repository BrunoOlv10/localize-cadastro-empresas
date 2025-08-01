import { Component } from '@angular/core';

@Component({
  selector: 'app-cnpj-form',
  imports: [],
  templateUrl: './cnpj-form.component.html',
  styleUrl: './cnpj-form.component.scss'
})
export class CnpjFormComponent {
    cnpj: string = '';

    onSubmit() {
        console.log('CNPJ enviado:', this.cnpj);
    }
}
