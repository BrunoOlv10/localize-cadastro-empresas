import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CnpjFormComponent } from './cnpj-form/cnpj-form.component';
import { CnpjListComponent } from './cnpj-list/cnpj-list.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, CnpjFormComponent, CnpjListComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
