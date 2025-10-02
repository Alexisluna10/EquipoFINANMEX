import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedirPrestamo } from './pedir-prestamo';

describe('PedirPrestamo', () => {
  let component: PedirPrestamo;
  let fixture: ComponentFixture<PedirPrestamo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedirPrestamo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedirPrestamo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
