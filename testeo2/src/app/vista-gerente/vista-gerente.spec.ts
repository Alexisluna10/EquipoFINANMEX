import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaGerente } from './vista-gerente';

describe('VistaGerente', () => {
  let component: VistaGerente;
  let fixture: ComponentFixture<VistaGerente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaGerente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaGerente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
