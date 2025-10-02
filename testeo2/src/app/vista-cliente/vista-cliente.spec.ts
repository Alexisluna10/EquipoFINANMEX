import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaCliente } from './vista-cliente';

describe('VistaCliente', () => {
  let component: VistaCliente;
  let fixture: ComponentFixture<VistaCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
