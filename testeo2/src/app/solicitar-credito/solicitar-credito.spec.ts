import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarCredito } from './solicitar-credito';

describe('SolicitarCredito', () => {
  let component: SolicitarCredito;
  let fixture: ComponentFixture<SolicitarCredito>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarCredito]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitarCredito);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
