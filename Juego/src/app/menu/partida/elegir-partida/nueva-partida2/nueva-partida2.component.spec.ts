import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaPartida2Component } from './nueva-partida2.component';

describe('NuevaPartida2Component', () => {
  let component: NuevaPartida2Component;
  let fixture: ComponentFixture<NuevaPartida2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaPartida2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaPartida2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
