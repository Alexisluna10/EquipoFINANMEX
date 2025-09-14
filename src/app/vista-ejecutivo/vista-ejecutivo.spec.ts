import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaEjecutivo } from './vista-ejecutivo';

describe('VistaEjecutivo', () => {
  let component: VistaEjecutivo;
  let fixture: ComponentFixture<VistaEjecutivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaEjecutivo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaEjecutivo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
