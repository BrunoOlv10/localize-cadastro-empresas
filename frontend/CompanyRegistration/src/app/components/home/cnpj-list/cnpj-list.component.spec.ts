import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnpjListComponent } from './cnpj-list.component';

describe('CnpjListComponent', () => {
  let component: CnpjListComponent;
  let fixture: ComponentFixture<CnpjListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CnpjListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CnpjListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
