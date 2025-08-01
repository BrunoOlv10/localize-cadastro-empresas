import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnpjFormComponent } from './cnpj-form.component';

describe('CnpjFormComponent', () => {
  let component: CnpjFormComponent;
  let fixture: ComponentFixture<CnpjFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CnpjFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CnpjFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
